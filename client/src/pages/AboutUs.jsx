import React from "react";
import NavbarViewer from "../components/NavbarViewer";
import "../App.css";

const AboutUs = () => {
    return (
        <div className="aboutpage">
            <NavbarViewer/>

            <div className="aboutme">

                <div className="aboutcontainer">

                    <div><h1>About Friendy</h1></div>

                    <div>
                    <p>In today's fast-paced world, it can be tough to find those third spaces that encourage social interaction and genuine connections. Friendy is all about creating events that bring people together based on shared interests. Whether you're looking to recruit members for a book club, host a chill gathering in the park, or plan a fun dinner party, Friendy is your go-to solution for making friends and finding fun things to do on the spot. We believe in the power of the community, and our mission is to help you find your tribe and build lasting relationships </p>
                    </div>

                    <div><h1>Meet the owner</h1></div>
                    <p>Welcome! I'm Christopher Sy, the maker of Friendy. I'm a recent coding bootcamp grad passionate about visual design and web applications. Friendy is a labor of love, born out of my desire to create a platform that truly helps people connect. If you'd like to support Friendy or seek to collab, please reach out to me on my socials below. Thanks for being a part of Friendy, and I can't wait to see the amazing events you'll create!</p>

                    <div><h1>Annoucements</h1></div>
                    <p> [Sept.30] Blog currently in development</p>

                    <p className="tm">Founded September 2024</p>

                </div>
            </div>


        </div>
    );
};

export default AboutUs;