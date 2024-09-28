// === Resources ===
//https://stackoverflow.com/questions/30502962/testing-spring-security-with-postman

//@authorizeHttpRequests @csrf
//https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html

package com.friendy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.cors.*;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


@EnableRedisHttpSession
@EnableWebSecurity
@Configuration
public class SecurityConfig{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/events").permitAll()
                .requestMatchers("/events/**").permitAll()
                .requestMatchers("/events/*/join").permitAll()
                .requestMatchers("/create_event").permitAll()
                .requestMatchers("/my_events").permitAll()
                .requestMatchers("/create_friendy").permitAll()
                .requestMatchers("/auth_friendy").permitAll()
                .requestMatchers("/users/**").permitAll()
                // .requestMatchers("/users/*/delete").permitAll()
                .requestMatchers(HttpMethod.DELETE, "users/*").permitAll()
                .requestMatchers("/logout").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin()
            .and()
            .logout()
            .logoutSuccessUrl("/auth_friendy") 
            .invalidateHttpSession(true)
            .and()
            .exceptionHandling()
            .accessDeniedHandler((request, response, accessDeniedException) -> {
                System.out.println("Access Denied: " + accessDeniedException.getMessage());
                response.sendRedirect("/auth_friendy");
            });

        return http.build();
    }
}

    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowCredentials(true);
    //     configuration.addAllowedOrigin("http://localhost:5400");
    //     configuration.addAllowedMethod("*");
    //     configuration.addAllowedHeader("*");

    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }
