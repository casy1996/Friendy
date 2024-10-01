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
        <div className="createEventPage">
            <NavbarMember/>
            <div className="createBorder">
                <h1 className="createTitle editEventTitle">{formData.event}</h1>

                <div className="createForm">
                
                <form onSubmit={handleSubmit}>

                    <div className="eventStart">
                        <div>
                        <label>Event</label>
                        <input type="text" name="event" onChange={handleChange} value={formData.event} />
                        </div>
                        <div>   
                            <label>Guest Limit</label>
                            <br></br>
                            <input type="text" name="capacity" onChange={handleChange} value={formData.capacity}/>
                        </div>
                    </div>

                <div>
                    <label>Where</label>
                    <div className="eventLocation">
                        <input type="text" name="eventCity" onChange={handleChange} value={formData.eventCity}/>                        
                        <input type="text" name="eventState" onChange={handleChange} value={formData.eventState}/>
                    </div>
                </div>
                <div className="eventAddress">
                    <label>Address</label>
                    <br></br>
                    <input type="text" name="address" onChange={handleChange} value={formData.address}/>
                </div>
                <div className="eventDate">
                    <label>Date</label>
                    <br></br>
                    <input type="date" name="date" onChange={handleChange} value={formData.date}/>
                </div>

                <div className="eventTime">
                    <div>
                    <label>Start:</label>
                    <input type="time" name="startTime" onChange={handleChange} value={formData.startTime}/>
                    </div>
                    <div>   
                    <label>End</label>
                    <input type="time" name="endTime" onChange={handleChange} value={formData.endTime}/>
                    </div>
                </div>

                <div className="eventDesc">
                    <label>Description</label>
                    <br></br>
                    <input type="text" name="description" onChange={handleChange} value={formData.description}/>
                </div>
                
                <br></br>
                <button type="submit">Save Changes</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;