import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarViewer from "../components/NavbarViewer";

const Viewer = () => {
    const [events, setEvents] = useState([]);

    const allEvents = async () => {
        try{
            const response = await fetch("http://localhost:5500/events");
            if (!response.ok) {
                const errorMsg = await response.text();
                console.error("Failed to fetch events:", response.status, errorMsg);
                return;
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error displaying events");
        }
    };

    useEffect(() => {
        allEvents();
    }, []);

    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <div className="eventGallery">
            <NavbarViewer/>

            <div className="eventContainer">
                {events.length === 0 ? ( <p> No events at this moment</p> ) : (
                    events.map(event => (
                        <div key={event.id} className="eventCard">
                            <Link to={`/viewer/events/${event.id}`}>
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

export default Viewer;