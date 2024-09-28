import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarViewer from "../components/NavbarViewer";

const EventDetailViewer = () => {
    const params = useParams();
    const id = params.id;
    const [event, setEvent] = useState({});

    const oneEvent = async () => {
        try {
            const response = await fetch(`http://localhost:5500/events/${id}`);
            if (!response.ok){
                const errorMsg = await response.text();
                console.error("Failed to fetch single event:", response.status, errorMsg);
                return;
            }
            const data = await response.json();
            setEvent(data);
        } catch (error) {
            console.error(`Failed to open entry`, error);
        }
    };

    useEffect(() => {
        oneEvent();
    }, [id]);

    const handleJoin = async () => {
        alert("Please create an account to join events");
    };

    if (!event.event) {
        return <div>Loading...</div>
    };

    return (
        <div>
            <NavbarViewer/>

            <div className="detailPage">

            <div className="leftDetail">
            <h1>{event.event}</h1>
            <h2>hosted by {event.user.userName}</h2>
            <p>Date: {event.date}</p>
            <p>Time: {event.startTime} = {event.endTime}</p>
            <p>{event.description}</p>
            <button onClick={handleJoin}>Join</button>
            </div>

            <div className="rightDetail">
                {/* Google API Map or event image */}
                <p>{event.address}</p>
            </div>

            </div>
        </div>
    );
};

export default EventDetailViewer;