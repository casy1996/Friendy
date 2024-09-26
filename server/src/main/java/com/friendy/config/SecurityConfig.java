package com.friendy.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
//import package for CORS support and configuration bean
import org.springframework.web.cors.*;
//import for cookie handling
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

// === Resources ===
//https://stackoverflow.com/questions/30502962/testing-spring-security-with-postman

//@authorizeHttpRequests @csrf
//https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html
@Configuration
@EnableRedisHttpSession
public class SecurityConfig{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            //disable csrf to allow testing on postman
            .csrf().disable()
            .authorizeHttpRequests()
            // Allow access to the following paths without authentication
            .requestMatchers("/", "/login", "/users", "/users/**", "/create_friendy", "/auth_friendy", "/logout", "/events", "/events/**", "/events/*/join", "/create_event", "/my_events")
            .permitAll()
            // Secure other endpoints not defined in .requestMatchers()
            .anyRequest().authenticated()  
            .and()
            // enable authentication 
            // .httpBasic()
            // .and()
            //enables spring security logout configuration
            .logout()
            //redirect after logout
            .logoutSuccessUrl("/auth_friendy") 
            .invalidateHttpSession(true); 

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("http://localhost:5400");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
