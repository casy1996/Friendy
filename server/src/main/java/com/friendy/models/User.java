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
    private String firstName;

    @Column(name="LAST_NAME", nullable = false)
    private String lastName;
    
    @Column(name="USER_NAME", nullable = false, unique = true)
    @Size(min = 4)
    private String userName;

    @Column(name="EMAIL", nullable = false, unique = true)
    @Email
    private String email;

    @Column(name="PASSWORD", nullable = false)
    @Size(min = 6)
    private String password;

    @Column(name="STATE", nullable = false)
    private String state;

    @Column(name="CITY", nullable = false)
    private String city;

}