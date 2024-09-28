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
        <div>
            <NavbarMember/>
            <div>
            <h1>Host an event!</h1>
            <EventForm/>
            </div>
            <br></br>
        </div>
    );
};

export default CreateEvent;