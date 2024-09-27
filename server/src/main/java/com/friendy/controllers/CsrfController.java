//create class for getting the csrftoken from spring security so that the frontend can call the method on page load
package com.frinedy.controllers;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class CsrfController {

    @GetMapping("/csrf")
    public CsrfToken getCsrf(HttpServletRequest request) {
        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        if (token != null) {
            System.out.println("CSRF Token: " + token.getToken());
        }
        return token;
    }
}


// import org.springframework.security.web.csrf.CsrfToken;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RestController;

// import jakarta.servlet.http.HttpServletRequest;

// @RestController
// public class CsrfController {

//     @GetMapping("/csrf")
//     public CsrfToken getToken(HttpServletRequest request) {
//         return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//     }
// }