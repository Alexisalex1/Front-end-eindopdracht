import React, { useState, useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import "./Forms.css"
import FormSwitchButton from "../../components/buttons/FormSwitchButton";


{/*This function is where the user give the username and password input so that it can be used in the authProvider. The handleSubmit calls the login in the authProvider so that an API request can be made */}
const LoginForm = () => {
    const {login, status } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login( username, password);
    };

    {/*The errors are handled and showed here, depending on the status useContext. The login form is handled here aswell with input field. */}
    return (
        <main className="auth-container">
            {status === "error" && (
                <p className="status-message-error">Wrong Username or Password. Please try again.</p>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <label
                    className="label-padding"
                    htmlFor="username">Username</label>
                <input
                    className="input-field-auth"
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label
                    className="label-padding"
                    htmlFor="password">Password</label>
                <input
                    className="input-field-auth"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="button-border"
                    type="submit">Log in</button>

            </form>

                {/*Used to switch from loginForm to registerForm*/}
                <FormSwitchButton/>
        </main>
    );
}
export default LoginForm;