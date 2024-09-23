import React from "react";
import { Link } from "react-router-dom";

const NavbarViewer = () => {
  return (
    <nav>
      <Link to="/friendy-home">
        <h1>Friendy</h1>
      </Link>
      <Link to="/about-us">About Us</Link>
    </nav>
  );
};

export default NavbarViewer;