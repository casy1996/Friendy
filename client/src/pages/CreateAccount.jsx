import React from "react";
import { Link } from "react-router-dom";
import AccountForm from "../components/AccountForm";
import NavbarLanding from "../components/NavbarLanding";
import titleImg from "../assets/logo/logo.png";

const CreateAccount = () => {
    return (
        <div className="accountPage">
            <NavbarLanding/>
            
            <div className="accountBorder">

                <div className="accountTitle"><img src={titleImg} alt="friendy_logo"/></div>
                <p>Create an account to join events and host your own</p>
                <div className="accountForm"><AccountForm/></div>
                <div className="toLogin"><Link to="/login">Already have an account? Log In here</Link></div>


            </div>

        </div>
    );
};

export default CreateAccount;