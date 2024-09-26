import React from "react";
import { Link } from "react-router-dom";

const NavbarMember = () => {
  return (
    <nav>
        <div>
        <Link to="/friendy-home">
            <h1>Friendy</h1>
        </Link>
        </div>
        <div> 
        <Link to="/my_events">
            <h1>my_events</h1>
        </Link>
        <Link to="/user_profile">
            <h1>profile</h1>
        </Link>
        <Link to="/friendy">
            <h1>logout</h1>
        </Link>
        </div>
    </nav>
  );
};

export default NavbarMember;