import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarMember = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await fetch("http://localhost:5500/logout",{
                method: "POST",
                credentials: "include",
            });
            navigate("/friendy");

        } catch (error) {
            console.error("Error during logout:", errror);
        }
    }

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
        <button onClick={handleLogout}>
            <h1>logout</h1>
        </button>
        </div>
    </nav>
  );
};

export default NavbarMember;