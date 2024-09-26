import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";
import { getCsrfToken } from "../utils/csrfUtil";

const EventDetailMember = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [event, setEvent] = useState({});

    const oneEvent = async () => {
        try {
            const csrfToken = getCsrfToken();
            const response = await fetch(`http://localhost:5500/events/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken
                },
            credentials: "include"
            });

            if (!response.ok){
                const errorMsg = await response.text();
                console.error("Failed to fetch single event", response.status, errorMsg);
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
        try {
            const csrfToken = getCsrfToken();
            if (event.attendees.length >= event.capacity){
                console.error("Failed to join event, event at capacity");
            } else {
                const response = await fetch(`http://localhost:5500/events/${id}/join`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    credentials: "include"
                });

                if (response.ok){
                    oneEvent();
                } else {
                    const errorMsg = await response.text();
                    console.error("Error joining event", errorMsg);
                }
            }
        } catch (error) {
            console.error("Error joining event", error);
        }
    };

    const handleEdit = async () => {
        navigate(`/events/${id}/edit`);
    };

    if (!event.event) {
        return <div>Loading...</div>
    };

    return (
        <div>
            <NavbarMember/>
            <div>
                <button onClick={handleEdit}>Edit</button>
            </div>

            <div className="detailpage">

            <div className="leftDetail">
            <h1>{event.event}</h1>
            <h2>hosted by {event.user.userName}</h2>
            <br />
            <p>When: {event.date}</p>
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

export default EventDetailMember;