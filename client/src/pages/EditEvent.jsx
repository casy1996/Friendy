import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarMember from "../components/NavbarMember";

const EditEvent = () => {
    const params =  useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        event: '',
        eventState: '',
        eventCity: '',
        address: '',
        description: '',
        date: '',
        startTime:'',
        endTime:'',
        capacity:'',
    });

    const editEvent = async () => {
        try {
            const response = await fetch(`http://localhost:5500/events/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Failed to open entry", error);
        }
    };

    useEffect(() => {
        editEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5500/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Event edited!");
            navigate(`/member/events/${id}`);
        } else {
            alert("Error updating profile.");
        }
    };

    return (
        <div>
            <NavbarMember/>
            <h1>Edit Event Details</h1>
            <h2>{formData.event}</h2>
            <form onSubmit={handleSubmit}>
                <label>Event Title:
                <input type="text" name="event" onChange={handleChange} value={formData.event} />
                </label>
                <label>Where:
                <input type="text" name="eventCity" onChange={handleChange} value={formData.eventCity}/>
                <input type="text" name="eventState" onChange={handleChange} value={formData.eventState}/>
                </label>
            <div>
                <label>Address:</label>
                <br></br>
                <input type="text" name="address" onChange={handleChange} value={formData.address}/>
            </div>
            <div>
                <label>Description:</label>
                <br></br>
                <input type="text" name="description" onChange={handleChange} value={formData.description}/>
            </div>
            <div>
                <label>Date:</label>
                <br></br>
                <input type="date" name="date" onChange={handleChange} value={formData.date}/>
            </div>
            <div>
                <label>Start:</label>
                <br></br>
                <input type="time" name="startTime" onChange={handleChange} value={formData.startTime}/>
            </div>
            <div>
                <label>End</label>
                <br></br>
                <input type="time" name="endTime" onChange={handleChange} value={formData.endTime}/>
            </div>
            <div>
                <label>Max Capacity:</label>
                <br></br>
                <input type="text" name="capacity" onChange={handleChange} value={formData.capacity}/>
            </div>
            <br></br>
            <button type="submit">Save Changes</button>
        </form>
        </div>
    );
};

export default EditEvent;