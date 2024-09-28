// page to display user information 
// modify user model to accept a profile picture
// add a default friendy profile picture if user doesnt provide one

import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarMember from "../components/NavbarMember";

const UserDetails = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [photo, setPhoto] = useState(null);

    const oneUser = async () => {
        try {
            const response = await fetch(`http://localhost:5500/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            credentials: "include"
            });

            if (!response.ok){
                const errorMsg = await response.text();
                console.error("Failed to fetch user data", response.status, errorMsg);
                return;
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Failed to find user", error);
        }
    };

    useEffect(() => {
        oneUser();
    }, [id]);


    const handleEdit = async () => {
        navigate(`/users/${id}/edit`);
    };

    const handleFile = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!photo) return;
        const formData = new FormData();
        formData.append("file", photo);

        try {
            const response = await fetch(`http://localhost:5500/users/${id}/upload`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            if (response.ok) {
                alert("Profile picture updated successfully!");
                oneUser();
            } else {
                console.error("Error updating profile picture");
            }
        } catch (error) {
            console.error("Failed to upload profile picture", error);
        }
    };


    if (!user.userName) {
        return <div>Loading...</div>
    };

    return (
        <div>
            <NavbarMember/>

            <div className="profilePage">
                <br></br>
                <br></br>
                <div>
                <img src={`${user.profilePicture}`} alt="Profile Photo" />
                <input type="file" onChange={handleFile} />
                <button onClick={handleUpload}>Upload Profile Picture</button>
                </div>

                <div>
                <h1>{user.userName}</h1>
                <h2>{user.firstName} {user.lastName}</h2>
                <br />
                <p>Home: {user.city}, {user.state}</p>
                <p>Email: {user.email}</p>
                </div>

            </div>

            <div>
                <button onClick={handleEdit}>Edit Profile</button>
            </div>

        </div>
    );
};

export default UserDetails;