import React, { useState, useContext, useEffect } from "react";
import { AuthenticateContext } from "../../context/authenticateContext";
import "./authenticate.css";
import Register from "../../components/authenticateForm/registerForm";
import Login from "../../components/authenticateForm/loginForm";

function Authenticate() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, status, login, signup } = useContext(AuthenticateContext);

    const handleLoginSubmit = (username, password) => {
        login(username, password).then(() => {
            setIsLoggedIn(true)

        });
    };

    const handleRegisterSubmit = (username, email, password) => {
        signup(username, email, password);
    };

    useEffect(() => {
        if (status === "done" && user) {
            console.log("User logged in or signed up.");
        }
    }, [status, user]);

    if (status === "pending") {
        return <p>Loading...</p>;
    } else {
        return (
            <div className="auth-container">
                {isRegister ? (
                    <Register onSubmit={handleRegisterSubmit} />
                ) : (
                    <Login onSubmit={handleLoginSubmit} />
                )}
                <button onClick={() => setIsRegister(!isRegister)}>
                    {isRegister
                        ? "Already have an account? Log in here"
                        : "Don't have an account? Register here"}
                </button>
            </div>
        );
    }
}

export default Authenticate;
