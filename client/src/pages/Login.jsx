import React from "react";
import LoginForm from "../components/LoginForm";
import NavbarViewer from "../components/NavbarViewer";

const Login = () => {
    return (
        <div>
            <NavbarViewer/>
            <div>
            <h1>Log in to Friendy</h1>
            <LoginForm/>
            </div>
        </div>
    );
};

export default Login;