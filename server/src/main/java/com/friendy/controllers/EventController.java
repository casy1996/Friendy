//Package EventController
package com.friendy.controllers;
//Import model (event)
import com.friendy.models.Event;
//Import user model to referrence user data
import com.friendy.models.User;
//Import my EventService
import com.friendy.services.EventService;
//Import userService to access user based methods (findById)
import com.friendy.services.UserService;

import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
public class EventController {
    private final EventService eventService;
    //after importing, create instance so the controller can use it
    private final UserService userService;

    //initialize userService in the constructor
    public EventController(final EventService eventService, final UserService userService){
        this.eventService = eventService;
        this.userService = userService;
    }

    //Get all Events
    @GetMapping("/events")
    public List<Event> getAllEvents(){
        return this.eventService.allEvents();
    }

    //Show one specific event
    @GetMapping("/events/{id}")
    public Optional<Event> findOneEvent(@PathVariable Integer id){
        return eventService.oneEvent(id);
    }

    //Create/POST a event (only account holders)
    @PostMapping("/create_event")
    //? for T variable is 'wildcard", allows the return of different types like Event object or String object. Change to enable my Response status.body
    public ResponseEntity<?> host(@RequestBody Event newEvent, HttpSession session){

        //Utilize same logic from user controller to verify user session
        if (session.getAttribute("loggedIn") != null && (Boolean) session.getAttribute("loggedIn")){
            //retrieve users session id
            Integer connectedUserId = (Integer) session.getAttribute("userId");

            //Call userService to find user from session Id above
            //userService.oneUser returns an optional<user> so same data type here
            Optional<User> userForEvent = userService.oneUser(connectedUserId);
            //check internal value with isPresent then remove optional wrapper with .get
            if (userForEvent.isPresent()){
                User user = userForEvent.get();
                //Set the found user to this event (setUser setter in event model for Many-To-One)
                newEvent.setUser(user);
                //Tell event service layer to save the event in the database
                eventService.hostNew(newEvent);
                return ResponseEntity.status(HttpStatus.CREATED).body(newEvent);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Must be logged in to create an event.");
        }
    
    }
    // Update event (If User was the one to create it)
    // @PutMapping("/events/{id}")

    //Delete Event (If User was the one to create it)
    // @DeleteMapping("/events/{id}/delete")

    //Get all events that a User has joined/created
    // @GetMapping("/my_events")

}