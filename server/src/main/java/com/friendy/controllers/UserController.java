//Package UserController
package com.friendy.controllers;

//Import my UserService
import com.friendy.repositories.UserService;

//Import annotations for binding requests to controllrs and handler methods
//Mainly RestController, RequestMapping, RequestParam and CRUD Mapping (Get/Put/Delete/Post)
//https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/package-summary.html
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


}

