import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarViewer from "../components/NavbarViewer";

const Viewer = () => {
    const [events, setEvents] = useState([]);

    const allEvents = async () => {
        try{
            const response = await fetch("http://localhost:5500/events");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error displaying events");
        }
    };

    useEffect(() => {
        allEvents();
    }, []);

    return (
        <div>
            <NavbarViewer/>
            {/* add search bar to find new array of events */}
            <div>
                {events.length === 0 ? ( <p> No events at this moment</p> ) : (
                    events.map(event => (
                        <div key={event.id} className="event-card">
                            <Link to={`/events/${event.id}`}>
                            <h2>{event.event}</h2>
                            <h4>{event.eventCity},{event.eventState}</h4>
                            <h4>hosted by {event.userName}</h4>
                            <img src={`${event.image}`} alt={`${event.event}`}></img>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Viewer;