//Packagee UserRepository
package com.friendy.repositories;

//Import User model
import com.friendy.models.User;
//Import JpaRepository (Spring Data JPA Dependency) for all the CRUD functionality
import org.springframework.data.jpa.repository.JpaRepository;
//Import .stereotype package to enable use of @Repository annotation
//@Repository marks the class as a data access layer
import org.springframework.stereotype.Repository;

// Repo to handle interactions with our database in Postgres 
// Data Access Object
@Repository
// UserRepository is inheriting methods from the JpaRepo library (saving/deleting/finding)
//<User, Integer> User entity class (user from table) and Integer references the primary key (id) in model
public interface UserRepository extends JpaRepository<User, Integer> {
    // Jpa chosen over CrudRepository because of the additional functionality - secure app longevity
    // Specific queries not provided by JpaRepository should be added here
}