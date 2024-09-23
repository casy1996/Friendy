import React from 'react';
import AccountForm from "../components/AccountForm";
import NavbarViewer from '../components/NavbarViewer';

const CreateAccount = () => {
    return (
        <div>
            <NavbarViewer/>
            <div>
            <h1>Sign up to Friendy</h1>
            <AccountForm/>
            </div>
        </div>
    );
};

export default CreateAccount;