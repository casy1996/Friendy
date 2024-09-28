package com.friendy.controllers;

import com.friendy.services.UserService;
import com.friendy.services.EventService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
public class FileUploadController {

    private final UserService userService;
    private final EventService eventService;

    public FileUploadController(final UserService userService, final EventService eventService) {
        this.userService = userService;
        this.eventService = eventService;
    }

    private static final String UPLOAD_DIRECTORY = "src/main/resources/static/images/uploads/";

    // Upload user profile picture
    @PostMapping("/users/{id}/upload")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Integer id, @RequestParam("file") MultipartFile file, HttpSession session) {
        if (session.getAttribute("loggedIn") != null && (Boolean) session.getAttribute("loggedIn")) {
            Integer connectedUserId = (Integer) session.getAttribute("userId");
            if (connectedUserId.equals(id)) {
                try {
                    // Save the file locally
                    String fileName = saveFile(file);
                    String imageUrl = "/images/uploads/" + fileName;

                    // Update the user profile picture in the database
                    return userService.updateProfilePicture(id, file);
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authorized to update this user's profile.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log in to upload a profile picture.");
        }
    }

    // Upload event picture
    @PostMapping("/events/{eventId}/upload")
    public ResponseEntity<String> uploadEventPicture(@PathVariable Integer eventId, @RequestParam("file") MultipartFile file, HttpSession session) {
        if (session.getAttribute("loggedIn") != null && (Boolean) session.getAttribute("loggedIn")) {
            Integer connectedUserId = (Integer) session.getAttribute("userId");
            try {
                // Save the file locally
                String fileName = saveFile(file);
                String imageUrl = "/images/uploads/" + fileName;

                // Update the event picture in the database
                return eventService.updateEventPicture(eventId, connectedUserId, file);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log in to upload an event picture.");
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Generate a random file name to avoid conflicts
        String fileExtension = getFileExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;

        // Create the directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIRECTORY);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the file
        Path filePath = Paths.get(UPLOAD_DIRECTORY + fileName);
        Files.write(filePath, file.getBytes());

        return fileName;
    }

    // Helper method to extract file extension
    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "png"; // Default to png if no extension
    }
}

