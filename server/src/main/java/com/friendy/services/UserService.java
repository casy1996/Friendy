//Package UserService
package com.friendy.services;

//import User Model
import com.friendy.models.User;
//import User Repository
import com.friendy.repositories.UserRepository;
//import .stereotype package to enable @Services annotation
//@Service marks the class as a service layer component
import com.springframework.stereotype.Services;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = user Repository;
    }

    //Called on by getAllUsers() controller method
    public List<User> allUsers(){
        //tells repository layer to run findAll() using the Jpa Repository Library
        return userRepository.findAll();
    }

}