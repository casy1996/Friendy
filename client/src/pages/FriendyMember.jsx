import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";
// import "../App.css";

const Member = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const checkAuth = localStorage.getItem("authenticated");

    const allEvents = async () => {
        try{
            const response = await fetch("http://localhost:5500/events", {
                method: "GET",
                credentials: "include"
            });
            
            if (!response.ok) {
                const errorMsg = await response.text();
                console.error("Failed to fetch events", response.status, errorMsg);
                return;
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error displaying events", error);
        }
    };

    useEffect(() => {
        if (!checkAuth) {
            navigate("/login");
        } else {
            allEvents();
        }
    }, [checkAuth]);

    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <div className="eventGallery">
            <NavbarMember/>

            <div className="eventContainer">
                {events.length === 0 ? ( <p> No events at this moment</p> ) : (
                    events.map(event => (
                        <div key={event.id} className="eventCard">
                            <Link to={`/member/events/${event.id}`}>
                            <h2>{event.event}</h2>
                            <h5>📍{event.eventCity}, {event.eventState}</h5>
                            <p>hosted by {event.user.userName}</p>
                            <img src={`${apiUrl}${event.eventPicture}`} alt={`${event.event}`} className="cardImage"/>
                            </Link>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default Member;