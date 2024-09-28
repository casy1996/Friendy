import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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


    return (
        <div>
            <NavbarMember/>
            <br></br>
            <div>
                {events.length === 0 ? ( <p>Join an event or create your own to see them here.</p> ) : (
                    events.map(event => (
                        <div key={event.id} className="event-card">
                            <Link to={`/member/events/${event.id}`}>
                            <h2>{event.event}</h2>
                            <h4>{event.eventCity}, {event.eventState}</h4>
                            <h4>hosted by {event.user.userName}</h4>
                            <img src={`${event.eventPicture}`} alt={`${event.event}`}></img>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEvents;