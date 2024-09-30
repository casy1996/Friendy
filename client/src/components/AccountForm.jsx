import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

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
                {/* <label>Email</label> */}
                <br></br>
                <input type="text" name="email" onChange={handleChange} placeholder="Email" required/>
            </div>
            <div>
                {/* <label>Password</label> */}
                <br></br>
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required/>
                <p className="passRule">Minimum 6 characters</p>
            </div>
            <div>
                {/* <label>Username</label> */}
                <br></br>
                <input type="text" name="userName" onChange={handleChange} placeholder="Username" required/>
            </div>
            <div>
                {/* <label>First Name</label> */}
                <br></br>
                <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" required/>
            </div>
            <div>
                {/* <label>Last Name</label> */}
                <br></br>
                <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" required/>
            </div>
            <div>
                {/* <label>State</label> */}
                <br></br>
                <input type="text" name="state" onChange={handleChange} placeholder="State" required/>
            </div>
            <div>
                {/* <label>City</label> */}
                <br></br>
                <input type="text" name="city" onChange={handleChange} placeholder="City" required/>
            </div>
            <br></br>
            <button type="submit">Continue</button>
        </form>
    );
};

export default AccountForm;