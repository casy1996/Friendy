import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";

const EventDetailMember = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [photo, setPhoto] = useState(null);

    const oneEvent = async () => {
        try {
            const response = await fetch(`http://localhost:5500/events/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
            console.error("Failed to open entry", error);
        }
    };

    useEffect(() => {
        oneEvent();
    }, [id]);

    const handleJoin = async () => {
        try {
            if (event.attendees.length >= event.capacity){
                console.error("Failed to join event, event at capacity");
            } else {
                const response = await fetch(`http://localhost:5500/events/${id}/join`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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

    // const handleEdit = async () => {
    //     navigate(`/events/${id}/edit`);
    // };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this event? All attendees will be removed.");

        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:5500/events/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                if (response.ok){
                    alert("Successfully deleted event.")    
                    navigate("/friendy-home");
                } else {
                    alert("Failed to delete event.");
                }
            } catch (error) {
                alert("Failed to delete event. Catch error", error)
            }
        }
    };

    const handleFile = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!photo) return;
        const formData = new FormData();
        formData.append("file", photo);

        try {
            const response = await fetch(`http://localhost:5500/events/${id}/upload`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            if (response.ok) {
                alert("Event picture updated successfully!");
                oneEvent();
            } else {
                console.error("Error updating event picture");
            }
        } catch (error) {
            console.error("Failed to upload event picture", error);
        }
    };

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!event.event) {
        return <div>Loading...</div>
    };

    return (
        <div className="detailBackground">

        <div className="detailPage">
            <NavbarMember/>

            <div className="detailContainer">

                <div className="leftDetail">

                    <div className="detailOptions">
                        <Link to={`/events/${id}/edit`}>Edit</Link>
                        <Link onClick={handleDelete}>Delete</Link>
                    </div>

                    <h1>{event.event}</h1>
                    <h3>hosted by {event.user.userName}</h3>
                    <h5>Date: {event.date}</h5>
                    <h5>Time: {event.startTime} - {event.endTime}</h5>
                    <p>{event.description}</p>
                    <button onClick={handleJoin}>Join</button>

                </div>

                <div className="detailDivider"></div>

                <div className="rightDetail">
                    <img src={`${apiUrl}${event.eventPicture}`} alt={`${event.event}`} />
                    <p>{event.address}</p>

                    <div className="rightOption">
                        <input type="file" id="upload" onChange={handleFile} className="uploadDefault" />
                        <label htmlFor="upload" className="uploadImage">Select Cover Photo</label>
                        <button onClick={handleUpload}>Save</button>
                    </div>

                </div>

            </div>

            
        </div>
        </div>
    );
};

export default EventDetailMember;