//Package UserService
package com.friendy.services;

//import User Model
import com.friendy.models.User;
//import User Repository
import com.friendy.repositories.UserRepository;
//import .stereotype package to enable @Services annotation
//@Service marks the class as a service layer component
import org.springframework.stereotype.Service;
//import from spring security dependency to enable BCrypt class
import org.springframework.security.crypto.bcrypt.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    //instance field for using BCryptPasswordEncoder, named bcrypt
    private final BCryptPasswordEncoder bcrypt;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
        //instantiate new object of BcryptPassWordEncoder
        this.bcrypt = new BCryptPasswordEncoder();
    }

    //Called on by getAllUsers() controller method
    public List<User> allUsers(){
        //tells repository layer to run findAll() using the Jpa Repository Library
        return userRepository.findAll();
    }

    public Optional<User> oneUser(Integer id){
        return userRepository.findById(id);
    }

    //.save() detects if id is null or not to determine if this is a new or existing entity which allows .save() to be used for creating or updating
    public User createNew(User newUser){
        //Instead of passing plaint text to the database...
        //Pass the password from our User object through bcrypt encode method to encyrpt it. Then perform password setter
        newUser.setPassword(bcrypt.encode(newUser.getPassword()));
        //Save encrypted password
        return userRepository.save(newUser);
    }

    public String authUser(User user){
        Optional<User> findUser = userRepository.findByUserName(user.getUserName());

        //If username exists: check if entered password matches
        if(findUser.isPresent()){
            User friendyMember = findUser.get();
            //encrypt users entered password and check if it matches stored db password
            if(bcrypt.matches(user.getPassword(), friendyMember.getPassword())){
                //match = authetnicated
                return "Member Authenticated";
                //else wrong password
            } else {
                return "Incorrect Password";
            } 
        }
        //Error if no username found
        return "Username not found";
    }
}