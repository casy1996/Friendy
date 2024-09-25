//stage file
// just an introduction page of Friendy. Small descript about me and purpose of app.
import React from "react";
import NavbarViewer from "../components/NavbarViewer";

const AboutUs = () => {
    return (
        <div>
            <div>
            <NavbarViewer/>
            </div>
            <div>
            <h1>About</h1>
            </div>
            <div>
            <p>Friendy was founded by Christopher Sy, September 2024.</p>
            </div>
        </div>
    );
};

export default AboutUs;