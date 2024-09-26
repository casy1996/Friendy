import React from "react";
import { Link } from "react-router-dom";

const NavbarViewer = () => {
  return (
    <nav>
      <Link to="/friendy">
        <h1>Friendy</h1>
      </Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/friendy-guest">Events</Link>
      <Link to="/create-account">Create Account</Link>
    </nav>
  );
};

export default NavbarViewer;