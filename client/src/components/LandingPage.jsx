import React from "react";
import { Link } from "react-router-dom";

//Friendy Landing Page
//Carousel Image Background
//Centered Large App name
//Create Account Button
//Sign In Button
//link: continue without account

const LandingPage = () => {
    return (
        <div>
            <h1>Join local events, make life long friends</h1>
            <div>
                <Link to="/create-account"><button>Create Account</button></Link>
            </div>
            <div>
                <Link to="/login"><button>Sign In</button></Link>
            </div>
            <div>
                <Link to="/friendy-home">Continue without account</Link>
            </div>
        </div>
    );
};

export default LandingPage;


