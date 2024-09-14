//package statement to differentiate naming from other packages/directories
//organize related classes / group related classes, subpackages, and interfaces
//prevents naming conflicts (ex: can have a User class in model and controller. the package keeps them separate despite being named the same)
//allows file to be imported to others
package com.friendy.models;

// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.Id;
// import javax.persistence.Column;
// import javax.persistence.Table;
    //Check Springboot Version (version: 3.3.3 = use Jakarta package not Javax package)

    //Change to Jakarta packages
// import Jakarta.persistence.Entity;
// import Jakarta.persistence.GeneratedValue;
// import Jakarta.persistence.Id;
// import Jakarta.persistence.Column;
// import Jakarta.persistence.Table;
    //Import All
import jakarta.persistence.*;
// enables @NotNull/@Email/@Size constraints from jakarta.validation API dependency
import jakarta.validation.constraints.*;

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

    public void getPassword(String password){
        return password;
    }

    protected void setPassword(String password){
        this.password = password;
    }

    @Column(name="STATE", nullable = false)
    @NotNull
    private String state;

    public String getState(){
        return state;
    }

    public void setState(){
        this.state = state;
    }

    @Column(name="CITY", nullable = false)
    @NotNull
    private String city;

    public String getCity(){
        return city;
    }

    public void setCity(){
        this.city = city;
    }

}