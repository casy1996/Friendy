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
    </nav>
  );
};

export default NavbarViewer;