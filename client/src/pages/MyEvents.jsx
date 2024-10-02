import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";

const MyEvents = () => {    
    const [events, setEvents] = useState([]);

    const usersEvents = async () => {
        try {
            const response = await fetch(`http://localhost:5500/my_events`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok){
                console.error("Failed to find users event", response.status);
                return;
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Failed to open entry", error);
        }
    };

    useEffect(() => {
        usersEvents();
    }, []);

    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <div className="eventGallery">
            <NavbarMember/>

            <div className="eventContainer">
                {events.length === 0 ? ( <p>Join an event or create your own to see them here.</p> ) : (
                    events.map(event => (
                        <div key={event.id} className="myEventCard">
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

export default MyEvents;