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
        
    }

    //Get all events User has joined/created
    //code here


}