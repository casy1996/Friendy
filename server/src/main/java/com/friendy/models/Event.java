package com.friendy.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;
import java.util.Set;
import java.util.HashSet;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
//auto-generate timestamp when events are created
import org.hibernate.annotations.CreationTimestamp;


@Entity
@Table(name="EVENT")
public class Event {

    //Database Id of Event
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public int getId(){
        return id;
    }

    //Name of event
    @Column(name="EVENT", nullable = false)
    @NotNull
    private String event;

    public String getEvent(){
        return event;
    }

    public void setEvent(String event){
        this.event = event;
    }

    @Column(name="EVENT_STATE", nullable = false)
    @NotNull
    private String eventState;

    public String getEventState(){
        return eventState;
    }

    public void setEventState(String eventState){
        this.eventState = eventState;
    }

    @Column(name="EVENT_CITY", nullable = false)
    @NotNull
    private String eventCity;

    public String getEventCity(){
        return eventCity;
    }

    public void setEventCity(String eventCity){
        this.eventCity = eventCity;
    }

    //Address where event will be held
    @Column(name="ADDRESS", nullable = false)
    @NotNull
    private String address;

    public String getAddress(){
        return address;
    }

    public void setAddress(String address){
        this.address = address;
    }
    
    //Description of the event
    @Column(name="DESCRIPTION", nullable = false)
    @NotNull
    private String description;

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    //Date and time event was created on Friendy
    @Column(name="MADE", nullable = false)
    @CreationTimestamp
    private LocalDateTime made;

    public LocalDateTime getMade(){
        return made;
    }

    public void setMade(LocalDateTime made){
        this.made = made;
    }

    //Date of Event
    @Column(name="DATE", nullable = false)
    @NotNull
    private LocalDate date;

    public LocalDate getDate(){
        return date;
    }

    public void setDate(LocalDate date){
        this.date = date;
    }

    //Event Start Time (separte from end time for drop down integration
    @Column(name="START_TIME", nullable = false)
    @NotNull
    private LocalTime startTime;

    public LocalTime getStartTime(){
        return startTime;
    }

    public void setStartTime(LocalTime startTime){
        this.startTime = startTime;
    }

    @Column(name="END_TIME", nullable = false)
    @NotNull
    private LocalTime endTime;

    public LocalTime getEndTime(){
        return endTime;
    }

    public void setEndTime(LocalTime endTime){
        this.endTime = endTime;
    }

    //Capacity of Attendees
    @Column(name="CAPACITY", nullable = false)
    @NotNull
    private Integer capacity;

    public Integer getCapacity(){
        return capacity;
    }

    public void setCapacity(Integer capacity){
        this.capacity = capacity;
    }

    @Column(name="EVENT_PICTURE")
    private String eventPicture;

    public String getEventPicture(){
        return eventPicture;
    }

    public void setEventPicture(String eventPicture){
        this.eventPicture = eventPicture;
    }

    @Transient
    public String getEventDefault() {
        if (eventPicture == null || eventPicture.isEmpty()) {
            return "/images/event_default.png";
        }
        return eventPicture;
    }

    //ONE [USER] MANY [EVENTS]
    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user; //Reference the user who created the event named user_id. acts as foreign key for this event model. (ex: John creates an event, event table will have a user_id which is a reference to John the user.
    
    public User getUser() {
        return user;
    }

    public void setUser(User user){
        this.user = user; 
    }

    @ManyToMany(mappedBy = "events")
    private Set<User> attendees = new HashSet<>();

    public Set<User> getAttendees(){
        return attendees;
    }

    public void setAttendees(Set<User> attendees){
        this.attendees = attendees;
    }

}