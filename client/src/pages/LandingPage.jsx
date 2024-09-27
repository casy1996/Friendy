import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarLanding from "../components/NavbarLanding";

const LandingPage = () => {
    
    return (
        <div>
            <div>
            <NavbarLanding/>
            </div>
            <div>
            <h1>Join local events, make life long friends</h1>
            </div>
            <div>
                <Link to="/create-account"><button>Create Account</button></Link>
            </div>
            <div>
                <Link to="/login"><button>Sign In</button></Link>
            </div>
            <div>
                <Link to="/friendy-guest">Continue without account</Link>
            </div>
        </div>
    );
};

export default LandingPage;

   // const userToken = async () => {
    //     try{
    //         const response = await fetch("http://localhost:5500/csrf", {
    //             method: "GET",
    //             credentials: "include",
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP Error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         if (data && data.token) {
    //             document.cookie = `XSRF-TOKEN=${data.token}; path=/;`;
    //         } else {
    //             console.error("CSRF token not found in response");
    //         }
    //     } catch (error) {
    //         console.error("Failed setting CSRF token", error);
    //     }
    // };

    // useEffect(() => {
    //     userToken();
    // }, []);







//Friendy Landing Page
//Carousel Image Background
//Centered Large App name
//Create Account Button
//Sign In Button
//link: continue without account

// useEffect(() => {
//     fetch('http://localhost:5500/csrf', {
//         method: "GET",
//         credentials: "include"
//     })
//     .then(response => response.json())
//     .then(data => {
//         localStorage.setItem("csrfToken", data.token);
//     });
// }, []);
