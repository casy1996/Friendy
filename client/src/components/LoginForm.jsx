import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5500/auth_friendy", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            
            if (response.ok){
                localStorage.setItem("authenticated", true);
                navigate("/friendy-home");
                console.log(formData);
            } else {
                console.error("Failed to login");
            }
        } catch (error) {
            console.error("Failed to login.", error);
        };
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <br></br>
                <input type="text" name="userName" onChange={handleChange} required/>
            </div>
            <div>
                <label>Password</label>
                <br></br>
                <input type="text" name="password" onChange={handleChange} required/>
            </div>
        </form>
        <br></br>
        <button type="submit">Continue</button>
        </div>
    );
};

export default LoginForm;