//package statement to differentiate naming from other packages/directories
//organize related classes / group related classes, subpackages, and interfaces
//prevents naming conflicts (ex: can have a User class in model and controller. the package keeps them separate despite being named the same)
//allows file to be imported to others
package com.friendy.models;

import jakarta.persistence.*;
// enables @NotNull/@Email/@Size constraints from jakarta.validation API dependency
import jakarta.validation.constraints.*;
import java.util.Set;
import java.util.HashSet;
//prevent endless nested loop of event/user 
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="MEMBER")
public class User {

    // Generate an ID per user entity
    // Strategy parameter allows for auto-incremented id's 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // int (primitive non-null integer) vs 
    // Integer (object, can be null) vs
    // long (primitive non-null extra-long integer)
    private int id;

    //Getter for id - will be referrenced for user sessions and when model is joined with Events model
    public int getId(){
        return id;
    }

    @Column(name="FIRST_NAME", nullable = false)
    @NotNull
    private String firstName;

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstname){
        this.firstName = firstname;
    }

    @Column(name="LAST_NAME", nullable = false)
    @NotNull
    private String lastName;

    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastname){
        this.lastName = lastname;
    }
    
    @Column(name="USER_NAME", nullable = false, unique = true)
    @NotNull
    @Size(min = 4)
    private String userName;

    public String getUserName(){
        return userName;
    }

    public void setUserName(String username){
        this.userName = username;
    }

    @Column(name="EMAIL", nullable = false, unique = true)
    @NotNull
    @Email
    private String email;

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    @Column(name="PASSWORD", nullable = false)
    @NotNull
    @Size(min = 6)
    private String password;

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    @Column(name="STATE", nullable = false)
    @NotNull
    private String state;

    public String getState(){
        return state;
    }

    public void setState(String state){
        this.state = state;
    }

    @Column(name="CITY", nullable = false)
    @NotNull
    private String city;

    public String getCity(){
        return city;
    }

    public void setCity(String city){
        this.city = city;
    }

    @Column(name="PROFILE_PICTURE")
    private String profilePicture;

    public String getProfilePicture(){
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture){
        this.profilePicture = profilePicture;
    }

    //Create a joined table showing all events that an individual user has joined AND every user in a specific event.
    //user_id is the foreign key in EVENTS, that references a specific user
    //event_id references the primary key of an event. 
    @ManyToMany
    @JoinTable(
        name = "ATTENDEES", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    public Set<Event> getEvents(){
        return events;
    }

    public void setEvents(Set<Event> events){
        this.events = events;
    }

}