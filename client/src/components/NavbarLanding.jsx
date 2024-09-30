import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavbarLanding = () => {
  return (
    <div className="navStandard">

      <nav className="navLanding">
        <Link to="/friendy"><h1>friendy</h1></Link>

        <div className="navOptions">
          <Link to="/about-us">about us</Link>
          <Link to="/friendy-guest">events</Link>
        </div>

      </nav>

    </div>
  );
};

export default NavbarLanding;