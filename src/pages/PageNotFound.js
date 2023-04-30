import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import { AuthContext} from "../context/AuthContext";


{/*This either renders the Home button or Login button, depending on if the user is logged in or not (just like in App.js*/}
function PageNotFound () {
    const { user } = useContext(AuthContext)
    return (
        <main>
            <h1>
                PAGE DOES NOT EXIST
            </h1>
            Go back to{" "}
            {user ? (
                <NavLink className="retry-button" to="/">
                    Home
                </NavLink>
            ) : (
                <NavLink className="retry-button" to="/login">
                    Login
                </NavLink>
            )}
        </main>
    );
}

export default PageNotFound;