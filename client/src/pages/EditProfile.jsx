import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";

const EditProfile = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password:"",
        state: "",
        city: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:5500/users/${id}`,{
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5500/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert("Profile Updated!");
            navigate(`/my-profile/${id}`);
        } else {
            alert("Failed to update profile.");
        }
    };

    const handleDelete = async () => {
        try{
            const response = await fetch(`http://localhost:5500/users/${id}/created-events`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok){
                alert("Failed to fetch user's events.");
                return;
            }

            const events = await response.json();

            if(events.length > 0) {
                alert("You must delete your created events before deactivating your account");
            } else {
                const confirmed = window.confirm("Are you sure you want to deactivate your account?");
                if (confirmed) {
                    const deleteResponse = await fetch(`http://localhost:5500/users/${id}`, {
                        method: "DELETE",
                        credentials: "include"
                    });

                    if (deleteResponse.ok){
                        alert("Successfully deleted account.");
                        navigate("/friendy");
                    } else {
                        alert("Failed to delete account.");
                    }
                }
            }
        } catch (error) {
            console.error("Error while deleting account:", error);
            alert("Deactivation failed.");
        }
    };
    

    return (
        <div>
            <NavbarMember/>

            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="userName"
                        value={user.userName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={user.state}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Profile</button>
            </form>

            <div>
                <button onClick={handleDelete}>Deactivate Account</button>
            </div>

        </div>
    );
};

export default EditProfile;

