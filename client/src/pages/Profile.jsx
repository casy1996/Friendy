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

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!user.userName) {
        return <div>Loading...</div>
    };

    return (
        <div>
            <NavbarMember/>

            <div className="profilePage">
                <br></br>

                <div className="profileHeader">
                    <div className="profileOptions">

                        <img src={`${apiUrl}${user.profilePicture}`} alt={`${user.userName}`} className="profileImage"/>
                        <br></br>

                        <div className="editProfileButton"><button onClick={handleEdit}>Edit Profile</button></div>
                        <input type="file" id="uploadProfile" onChange={handleFile} className="uploadProfileDefault"/>
                        <label htmlFor="uploadProfile" className="uploadProfileImage">Upload Picture</label>
                        <button onClick={handleUpload}>Change Profile Picture</button>

                    </div>

                    <div className="profileUser">
                        <h1>{user.userName}</h1>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <br/>
                        <p>Home: {user.city}, {user.state}</p>
                        <p>Contact: {user.email}</p>
                    </div>

                </div>


            </div>

            <div>
            </div>

        </div>
    );
};

export default UserDetails;