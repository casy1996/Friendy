//Package EventService
package com.friendy.services;
//import Event Model
import com.friendy.models.Event;
//import Event Repository
import com.friendy.repositories.EventRepository;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(final EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> allEvents(){
        return eventRepository.findAll();
    }

    public Optional<Event> oneEvent(Integer id){
        return eventRepository.findById(id);
    }

    public Event hostNew(Event newEvent){
        return eventRepository.save(newEvent);
    }

    //Update Event
    //code here

    //Delete Event
    public ResponseEntity<String> deleteEvent(Integer eventId, Integer connectedUserId){
        //find event
        Optional<Event> foundEvent = eventRepository.findById(eventId);
        if (foundEvent.isPresent()) {
            //unwrapp foundEvent optional to access getters
            Event deletingEvent = foundEvent.get();
            //check if event to be deleted was made by the account logged in
            //access Event model getters - getUser is the FK related to a user in the user model. getId to get the id from user model. check if it equals session id.
            if (deletingEvent.getUser().getId() == connectedUserId){
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
    
    //Get all events User has joined/created
    //code here


}