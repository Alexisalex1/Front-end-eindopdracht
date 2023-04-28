import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/authContext";
import "./forms.css";
import {Link, useNavigate} from "react-router-dom";
import FormSwitchButton from "../../components/Buttons/formSwitchButton";


const RegisterForm = () => {
    const { register, status, errorMessage, isLoading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [submitCount, setSubmitCount] = useState(0);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.includes("@")) {
            setError("Invalid email address.");
            setSubmitCount(submitCount + 1);
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setSubmitCount(submitCount + 1);
        } else if (username.length < 6) {
            setError("Username must be at least 6 characters.");
            setSubmitCount(submitCount + 1);
        } else {

            register(username, password, email);
            if (status === "error") {
                setError(errorMessage);
                setSubmitCount(submitCount + 1);
            }

        }

    };

    useEffect(() => {
        if (status === "done" || status ===! "error") {

        }

        if (status === "done") {
            setTimeout(() => {
                navigate("/login");
            }, 4000);
        }
    }, [status, navigate]);


    return (

        <div className="auth-container"> {isLoading && <div>Loading...</div>}
            {status === "done" && !isLoading && (
                <div className="status-message-success">
                    Registration successful! You will be redirected to login in a moment...
                </div>
                )}
            <form className="register-form" onSubmit={handleSubmit}>
                {error && !isLoading && (
                    <div
                        key={submitCount}
                        className="status-message-error shake"
                    >
                        {error}
                    </div>
                )}
                <label className="label-padding" htmlFor="email">
                    Email
                </label>
                <input
                    className="input-field-auth"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label-padding" htmlFor="username">
                    Username
                </label>
                <input
                    className="input-field-auth"
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label-padding" htmlFor="password">
                    Password
                </label>
                <input
                    className="input-field-auth"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button-border" type="submit">
                    Register
                </button>
            </form>
            <FormSwitchButton />
        </div>
    );
};

export default RegisterForm;
