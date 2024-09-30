import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavbarViewer = () => {
  return (
    <div className="navStandard">

      <nav className="navLanding">
        <Link to="/friendy"><h1>Friendy</h1></Link>

        <div className="navOptions">
          <Link to="/about-us">About Us</Link>
          <Link to="/friendy-guest">Events</Link>
          <Link to="/create-account">Create Account</Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarViewer;