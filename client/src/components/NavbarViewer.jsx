import React from "react";
import { Link } from "react-router-dom";

const NavbarViewer = () => {
  return (
    <nav>
      <Link to="/friendy-guest">
        <h1>Friendy</h1>
      </Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/create-account">Sign Up</Link>
    </nav>
  );
};

export default NavbarViewer;