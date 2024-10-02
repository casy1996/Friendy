// Acts as our Main.java, where the application is run from
package com.friendy;
//Default from spring initializer
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//Enable Redis Session
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

//Add Redis Session Annotation
@EnableRedisHttpSession
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class FriendyApplication {

	public static void main(String[] args) {
		SpringApplication.run(FriendyApplication.class, args);
	}

}
