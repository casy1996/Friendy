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
    <nav className="navStandard">

        <div className="navLanding">
            <Link to="/friendy-home"><h1>friendy</h1></Link>

            <div className="navOptions">
                <Link to="/host-event">host</Link> 
                <Link to="/my-events">my events</Link>
                {userId && (
                <Link to={`/my-profile/${userId}`}>profile</Link>
                )}

                <Link onClick={handleLogout}>logout</Link>

            </div>

        </div>
    </nav>
  );
};

export default NavbarMember;