//Package UserController
package com.friendy.controllers;

//Import model
import com.friendy.models.User;
//Import my UserService
import com.friendy.services.UserService;

//Import annotations for binding requests to controllrs and handler methods
//Mainly RestController, RequestMapping, RequestParam and CRUD Mapping (Get/Put/Delete/Post)
//https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/package-summary.html
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
//imports to enable sending error and http status codes/messages
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import java.util.List;
import java.util.Optional;

//Annotation means the class is a REST controller that handles HTTP requests and returns JSON to render on the frontend
@RestController
//entry point for all requests
public class UserController {
    //UserService object saved as 'userService'
    private final UserService userService;

    public UserController(final UserService userService){
        this.userService = userService;
    }

    //Use GetMapping annotation to allow user to make an HTTP GET request at some path
    @GetMapping("/users")
    //method to GET all user entities
    public List<User> getAllUsers(){
        //tells service layer to run its method called 'allUsers'
        return this.userService.allUsers();
    }

    @GetMapping("/users/{id}")
    //Optional prevents null exceptions by checking if a value (inner object) is present or absent.
    //https://www.oracle.com/technical-resources/articles/java/java8-optional.html
    //PathVariable used to grab id from the URL path we are accessing
    public Optional<User> findOneUser(@PathVariable Integer id){
        return userService.oneUser(id);
    }

    //Create/POST a user
    @PostMapping("/create_friendy")
    public User create(@RequestBody User newUser){
        return userService.createNew(newUser);
    }

    //Endpoint to authenticate a user
    //Where the login page POSTs, to find user & check password match
    //Update to pass session object (establish session in Service)
    @PostMapping("/auth_friendy")
    //return response entity over plain string object
    public ResponseEntity<String> authenticateUser(@RequestBody User user, HttpSession session){
        return userService.authUser(user, session);
    }

    // //Update/PUT
    // //Fetch entry from user table then .save() to update user
    @PutMapping("/users/{id}")
    //Path parameter for id to pull user id, and request body for changed field values
    //Change to response entity and verify user is authenticated via session
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody User user, HttpSession session){
        //Restrict use of method unless a session is successfully created showing loggedIn status true
        if (session.getAttribute("loggedIn") != null && (Boolean) session.getAttribute("loggedIn")){
            Integer connectedUserId = (Integer) session.getAttribute("userId");
            //After checking session, check if session id equals the users id in the path (the user we are trying to update)
            if (connectedUserId.equals(id)){
                //if true, run service to update user credentials
                return userService.findAndUpdate(id, user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authorized to access this user.");
            }
        //If session verification failed    
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log in to edit your profile.");
        } 
    }

    //Create a LOGOUT method that removes the user session
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session){
        userService.logout(session);
        return ResponseEntity.ok("Successful Logout");
    }

}

