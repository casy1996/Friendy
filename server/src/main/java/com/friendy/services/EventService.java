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
    //code here

    //Get all events User has joined/created
    //code here


}