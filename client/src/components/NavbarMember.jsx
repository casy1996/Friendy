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
            sessionStorage.removeItem("userId");
            navigate("/friendy");

        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const userId = sessionStorage.getItem("userId");

  return (
    <nav>
        <div>
        <Link to="/friendy-home">
            <h1>friendy</h1>
        </Link>
        </div>
        <div>
        <Link to="/host-event">
            <h1>host</h1>
        </Link> 
        <Link to="/my-events">
            <h1>my events</h1>
        </Link>
        {userId && (
            <Link to={`/my-profile/${userId}`}>
                <h1>profile</h1>
            </Link>
        )}
        <button onClick={handleLogout}>
            <h1>logout</h1>
        </button>
        </div>
    </nav>
  );
};

export default NavbarMember;