import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',
        firstName: '',
        lastName: '',
        state: '',
        city:'',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch("http://localhost:5500/create_friendy", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            //Maybe modify, adding modal popup - let user choose to move to login
            navigate("/login");
            console.log(formData);
        } catch (error) {
            console.error("Error in account creation - please try again.", error);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="text" name="email" value="{formData.email}" onChange={handleChange} required/>
            </div>
            <div>
                <label>Password</label>
                <input type="text" name="password" value="{formData.password}" onChange={handleChange} required/>
            </div>
            <div>
                <label>Username</label>
                <input type="text" name="userName" value="{formData.userName}" onChange={handleChange} required/>
            </div>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" value="{formData.firstName}" onChange={handleChange} required/>
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value="{formData.lastName}" onChange={handleChange} required/>
            </div>
            <div>
                <label>State</label>
                <input type="text" name="state" value="{formData.state}" onChange={handleChange} required/>
            </div>
            <div>
                <label>City</label>
                <input type="text" name="city" value="{formData.city}" onChange={handleChange} required/>
            </div>
            <button type="submit">Continue</button>
        </form>
    );
};

export default AccountForm;