package com.friendy.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// === Resources ===
//https://stackoverflow.com/questions/30502962/testing-spring-security-with-postman

//@authorizeHttpRequests @csrf
//https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            //disable csrf to allow testing on postman
            .csrf().disable()
            .authorizeHttpRequests()
            // Allow access to the following paths without authentication
            .requestMatchers("/users", "/users/**", "/create_friendy", "/auth_friendy", "/logout",
             "/events","/events/**","/create_event").permitAll()  
            // Secure other endpoints not defined in .requestMatchers()
            .anyRequest().authenticated()  
            .and()
            // enable authentication 
            .httpBasic()
            .and()
            //enables spring security logout configuration
            .logout()
            //redirect after logout
            .logoutSuccessUrl("/auth_friendy") 
            .invalidateHttpSession(true); 

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
