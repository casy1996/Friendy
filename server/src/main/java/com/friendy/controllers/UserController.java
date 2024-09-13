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
}

