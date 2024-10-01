import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import NavbarMember from "../components/NavbarMember";


const CreateEvent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("authenticated");

        if (!loggedIn) {
            alert("Log in to host an event.");
            navigate("/login");
        }

    }, [navigate]);

    return (
        <div className="createEventPage">
            <NavbarMember/>

            <div className="createBorder">


                <div className="createTitle"><h1>Host an event!</h1></div>
                <div className="createForm"><EventForm/></div>

            </div>
        
        </div>
    );
};

export default CreateEvent;