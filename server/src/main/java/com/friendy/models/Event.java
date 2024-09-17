//stage file structure to git
package com.friendy.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;
import java.util.Set;
import java.util.HashSet;
import java.time.LocalDate;


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
    @Column(name="CREATE", nullable = false)
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    public Date getCreated(){
        return created;
    }

    public void setCreated(Date created){
        this.created = created;
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
    @Temporal(TemporalType.TIME)
    private Date startTime;

    public Date getStartTime(){
        return startTime;
    }

    public void setStartTime(Date time){
        this.startTime = startTime;
    }

    @Column(name="END_TIME", nullable = false)
    @NotNull
    @Temporal(TemporalType.TIME)
    private Date endTime;

    public Date getEndTime(){
        return endTime;
    }

    public void setEndTime(Date time){
        this.endTime = endTime;
    }

    //Capacity of Attendees
    @Column(name="CAPACITY", nullable = false)
    @NotNull
    private int capacity;

    public int getCapacity(){
        return capacity;
    }

    public void setCapacity(int capacity){
        this.capacity = capacity;
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