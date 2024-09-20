//Package EventService
package com.friendy.services;
//import Event Model
import com.friendy.models.Event;
//user model import required for Joining event
import com.friendy.models.User;
//import Event Repository
import com.friendy.repositories.EventRepository;
//user repository required for joining event
import com.friendy.repositories.UserRepository;

import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;


@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(final EventRepository eventRepository, final UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public List<Event> allEvents(){
        return eventRepository.findAll();
    }

    public Optional<Event> oneEvent(Integer eventId){
        return eventRepository.findById(eventId);
    }

    public Event hostNew(Event newEvent){
        return eventRepository.save(newEvent);
    }

    //Update Event
    public ResponseEntity<String> modifyEvent(Integer eventId, Event event, Integer connectedUserId){
        //find event to update
        Optional<Event> foundEvent = eventRepository.findById(eventId);
        if (foundEvent.isPresent()){
            Event updateEvent = foundEvent.get();
            if (updateEvent.getUser().getId() == connectedUserId){
                //check updated fields and proceed if its not empty
                if (event.getEvent() != null){
                    //set the event name with what the user entered in the input
                    updateEvent.setEvent(event.getEvent());
                } 

                if(event.getEventState() != null){
                    updateEvent.setEventState(event.getEventState());
                }
                if(event.getEventCity() != null){
                    updateEvent.setEventCity(event.getEventCity());
                }
                if(event.getAddress() != null){
                    updateEvent.setAddress(event.getAddress());
                }
                if(event.getDescription() != null){
                    updateEvent.setDescription(event.getDescription());
                }
                if(event.getDate() != null){
                    updateEvent.setDate(event.getDate());
                }
                if(event.getStartTime() != null){
                    updateEvent.setStartTime(event.getStartTime());
                }
                if(event.getEndTime() != null){
                    updateEvent.setEndTime(event.getEndTime());
                }
                if(event.getCapacity() != null){
                    updateEvent.setCapacity(event.getCapacity());
                }
                eventRepository.save(updateEvent);
                return ResponseEntity.ok("Event updated!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot update this event");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Could not find event");
        }
    }

    //Delete Event
    public ResponseEntity<String> deleteEvent(Integer eventId, Integer connectedUserId){
        //find event
        Optional<Event> foundEvent = eventRepository.findById(eventId);
        if (foundEvent.isPresent()){
            //unwrapp foundEvent optional to access getters
            Event deletingEvent = foundEvent.get();
            //check if event to be deleted was made by the account logged in
            //access Event model getters - getUser is the FK related to a user in the user model. getId to get the id from user model. check if it equals session id.
            if (deletingEvent.getUser().getId() == connectedUserId){
                //Update to delete
                //Remove this event from all attendees who joined
                for (User attendee : deletingEvent.getAttendees()) {
                attendee.getEvents().remove(deletingEvent);
                }
                //clear the attendees Set<> for this event
                deletingEvent.getAttendees().clear();
                //run delete via repository
                eventRepository.deleteById(eventId);
                return ResponseEntity.ok("Event Deleted");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot delete this event");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to find event");
        }
    }

    //Join the event
    public ResponseEntity<String> joinEvent(Integer eventId, Integer connectedUserId){
        //find event
        Optional<Event> foundEvent = eventRepository.findById(eventId);
        //find User from user DB matches the user at the current session id
        Optional<User> findUser = userRepository.findById(connectedUserId);

        //upwrap both options
        if (foundEvent.isPresent() && findUser.isPresent()){
            Event thisEvent = foundEvent.get();
            User joiningUser = findUser.get();
        
        //make sure the current user is not already part of the attendees list
            if (thisEvent.getAttendees().contains(joiningUser)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already joined this event");
            }
            //add user to attendees (many-to-many getter "getAttendees()") then save
            thisEvent.getAttendees().add(joiningUser); 
            eventRepository.save(thisEvent);
            //add event to users events (events many-to-many getter "getEvents()")
            joiningUser.getEvents().add(thisEvent);
            userRepository.save(joiningUser);
            return ResponseEntity.ok("Successfully joined the event");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error finding event/user");
        }
    }

    //Get all events User has joined/created
    public List<Event> userEvents(Integer connectedUserId) {
        //find the user
        Optional<User> findUser = userRepository.findById(connectedUserId);
        //check if user was found, isPresent = true
        if (findUser.isPresent()) {
            // unpack optional wrapper with .get() then call getter for events
            // return an array, transforming the Set<Events> from model
            return new ArrayList<>(findUser.get().getEvents());
        } else {
            return Collections.emptyList();
        }
    }

}