import React from "react";
import AccountForm from "../components/AccountForm";
import NavbarLanding from "../components/NavbarLanding";

const CreateAccount = () => {
    return (
        <div>
            <NavbarLanding/>
            <div>
            <h1>Sign up to Friendy</h1>
            <AccountForm/>
            </div>
        </div>
    );
};

export default CreateAccount;