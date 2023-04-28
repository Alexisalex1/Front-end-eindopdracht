import React, { useContext } from 'react';
import {AuthContext} from "../../context/authContext";
import "./logoutButton.css"

{/*this functions as the logout button.  just a simple button to be able to activate the logout function in authProvider so that logalstorage is cleared and user is unauthorized from specific pages*/}

function LogoutButton() {
    const { logout } = useContext(AuthContext);

    const handleClick = () => {
        logout();
    };

    return (
        <button className="logout-button" onClick={handleClick}>Logout</button>
    );
}

export default LogoutButton;