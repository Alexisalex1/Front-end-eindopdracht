import React, { useState, useContext } from "react";
import {AuthContext} from "../../context/authContext";
import "./forms.css"
import FormSwitchButton from "../../components/Buttons/formSwitchButton";

const LoginForm = () => {
    const {login, status } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login( username, password);
    };

    return (
        <div className="auth-container">
            {status === "error" && (
                <p className="status-message-error">Wrong Username or Password. Please try again.</p>
            )}

            <div>
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
                <FormSwitchButton/>
            </div>
        </div>
    );
}
export default LoginForm;