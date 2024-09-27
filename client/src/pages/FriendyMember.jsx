import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";

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

    return (
        <div>
            <NavbarMember/>
            <div>
                {events.length === 0 ? ( <p> No events at this moment</p> ) : (
                    events.map(event => (
                        <div key={event.id} className="event-card">
                            <Link to={`/member/events/${event.id}`}>
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

export default Member;