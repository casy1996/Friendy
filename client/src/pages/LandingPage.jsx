import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarLanding from "../components/NavbarLanding";
import Carousel from "../components/ImageCarousel";

const LandingPage = () => {
    
    useEffect(() => {
        document.body.classList.add("landingScroll");

        return () => {
            document.body.classList.remove("landingScroll");
        };
    }, []);

    return (
        <div>
            <div>
            <NavbarLanding/>
            </div>

            <Carousel/>

            <div className="landingContainer">
                <h1>Host local events, make life long friends</h1>

            <div className="landingOptions">
                <div className="accBtn"><Link to="/create-account"><button>Create Account</button></Link></div>
                <div className="logBtn"><Link to="/login"><button>Sign In</button></Link></div>
                <div className="guestBtn"><Link to="/friendy-guest">Continue without account</Link></div>
            </div>

            </div>

        </div>
    );
};

export default LandingPage;
