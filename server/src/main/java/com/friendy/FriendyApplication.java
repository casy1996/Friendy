// Acts as our Main.java, where the application is run from
package com.friendy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FriendyApplication {

	public static void main(String[] args) {
		//Run Springboot App
		SpringApplication.run(FriendyApplication.class, args);
	}

}
