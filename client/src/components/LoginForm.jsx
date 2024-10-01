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
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok){
                localStorage.setItem("authenticated", true);
                sessionStorage.setItem("userId", data.userId);
                navigate("/friendy-home");
            } else {
                console.error("Failed to login", data);
            }
        } catch (error) {
            console.error("Failed to login.", error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                {/* <label>Username</label> */}
                <br></br>
                <input type="text" name="userName" onChange={handleChange} placeholder="Username" required/>
            </div>
            <div>
                {/* <label>Password</label> */}
                <br></br>
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required/>
            </div>
        <br></br>
        <button type="submit">Log in</button>
        </form>
        </div>
    );
};

export default LoginForm;