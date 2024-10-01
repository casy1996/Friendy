import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import NavbarViewer from "../components/NavbarViewer";

const Login = () => {
    return (
        <div className="loginPage">
            <NavbarViewer/>

            <div className="loginBorder">

                <h1>Welcome to friendy</h1>
                <div className="loginForm"><LoginForm/></div>
                <div className="toCreate"><Link to="/create-account"> First visit? Sign Up here</Link></div>

            </div>

        </div>
    );
};

export default Login;