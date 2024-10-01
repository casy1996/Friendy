import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
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

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch("http://localhost:5500/create_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            alert("Event successfully created!");
            navigate("/friendy-home");
        } catch (error) {
            console.error("Error in event creation - please try again.", error);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="eventStart">
                <div>
                <label>Event</label>
                <br></br>
                <input type="text" name="event" onChange={handleChange} placeholder="Title" required/>
                </div>
                <div>
                <label>Guest Limit</label>
                <br></br>
                <input type="text" name="capacity" onChange={handleChange} placeholder="Capacity" required/>
                </div>
            </div>
            <div>
                <label>Where</label>
                <br></br>
                <div className="eventLocation">
                <input type="text" name="eventCity" onChange={handleChange} placeholder='City' required/>
                <input type="text" name="eventState" onChange={handleChange} placeholder='State'required/>
                </div>
            </div>
            <div className="eventAddress">
                <label>Address</label>
                <br></br>
                <input type="text" name="address" onChange={handleChange} required/>
            </div>
            <div className="eventDate">
                <label>Date</label>
                <br></br>
                <input type="date" name="date" onChange={handleChange} required/>
            </div>
            <div className="eventTime">
                <div>
                <label>Start</label>
                <input type="time" name="startTime" onChange={handleChange} required/>
                </div>
                <div>
                <label>End</label>
                <input type="time" name="endTime" onChange={handleChange} required/>
                </div>
            </div>
            <div className="eventDesc">
                <label>Description</label>
                <br></br>
                <input type="text" name="description" onChange={handleChange} required/>
            </div>
            <br></br>
            <button type="submit">Create</button>
        </form>
    );
};

export default EventForm;