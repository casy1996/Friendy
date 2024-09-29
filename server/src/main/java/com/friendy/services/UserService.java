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
//import Spring Session, HttpSession
import jakarta.servlet.http.HttpSession;
//import to enable sending error and http status codes/messages
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
//imports for file handling
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    //instance field for using BCryptPasswordEncoder, named bcrypt
    private final BCryptPasswordEncoder bcrypt;
    //directory for image storage
    private final String uploadDirectory = "src/main/resources/static/images/uploads";

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
        //add a default profile picture on creation
        newUser.setProfilePicture("/images/profile_default.png");
        //Save encrypted password
        return userRepository.save(newUser);
    }

    //Update to accept session object
    public ResponseEntity<Map<String, Object>> authUser(User user, HttpSession session){
        Optional<User> findUser = userRepository.findByUserName(user.getUserName());

        //If username exists: check if entered password matches
        if(findUser.isPresent()){
            User friendyMember = findUser.get();
            //encrypt users entered password and check if it matches stored db password
            if(bcrypt.matches(user.getPassword(), friendyMember.getPassword())){
                //match = authetnicated
                //On sucessful login, create session with user details
                session.setAttribute("userId", friendyMember.getId());
                session.setAttribute("userName", friendyMember.getUserName());
                session.setAttribute("loggedIn", true);

                Map<String, Object> response = new HashMap<>();
                response.put("message", "Member Authenticated");
                response.put("userId", friendyMember.getId());

                return ResponseEntity.ok(response);
                //else wrong password
            } else {
                Map<String, Object> errorMsg = new HashMap<>();
                errorMsg.put("message", "Incorrect Password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMsg);
            } 
        }
        //Error if no username found
        Map<String, Object> errorMsg = new HashMap<>();
        errorMsg.put("message", "Username not found");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMsg);
    }

    //Update Profile
    public ResponseEntity<String> findAndUpdate(Integer id, User user){
        Optional<User> foundUser = userRepository.findById(id);

        //if attempting to edit an id that is not present in the database
        if (!foundUser.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        
        //.get() removes optional wrapper of the T element: <User> and opens access to getters and setters by returning the User object.
        User updateUser = foundUser.get();
        System.out.println("Editing: " + updateUser.getFirstName());

        //check fields for null, only update non-null fields (edited fields)
        if(user.getFirstName() != null){
            updateUser.setFirstName(user.getFirstName());
        }
        if(user.getLastName() != null){
            updateUser.setLastName(user.getLastName());
        }
        //Re-enable change username
        if(user.getUserName() != null){
            updateUser.setUserName(user.getUserName());
        }
        if(user.getPassword() != null){
            updateUser.setPassword(bcrypt.encode(user.getPassword()));
        }
        if(user.getEmail() != null){
            updateUser.setEmail(user.getEmail());
        }
        if(user.getState() != null){
            updateUser.setState(user.getState());
        }
        if(user.getCity() != null){
            updateUser.setCity(user.getCity());
        }
        userRepository.save(updateUser);
        return ResponseEntity.ok("Profile updated!");
    }

    //Logout
    public void logout(HttpSession session){
        session.invalidate();
    }

    //Delete Account
    public ResponseEntity<String> deleteMe(Integer id, HttpSession session){
        Optional<User> foundUser = userRepository.findById(id);

        if (foundUser.isPresent()){
            userRepository.deleteById(id);
            session.invalidate();
            return ResponseEntity.ok("Account Deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to find user");
        }
    }

    public ResponseEntity<String> updateProfilePicture(Integer id, MultipartFile file) throws IOException {
    Optional<User> foundUser = userRepository.findById(id);

        if (!foundUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = foundUser.get();

        // Ensure the file is not empty and is a valid image format (jpg/png)
        if (file.isEmpty() || !(file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/png"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type. Only JPEG and PNG are allowed.");
        }

        // Generate a file name and save the file to the uploads directory
        String fileName = id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory, "users", fileName);
        Files.createDirectories(filePath.getParent());  // Ensure directory exists
        Files.write(filePath, file.getBytes());

        // Update the user's profile picture URL
        user.setProfilePicture("/images/uploads/users/" + fileName);
        userRepository.save(user);  // Persist changes

        return ResponseEntity.ok("Profile picture updated successfully!");
    }

// End of User Service Class
}