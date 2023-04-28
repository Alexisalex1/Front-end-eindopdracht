import React, { useState, useEffect } from "react";
import {AuthContext} from "./authContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("pending");
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");
        if (accessToken && user) {
            setUser(JSON.parse(user));
        } else {
            setUser(null);
        }

    }, []);


    const login = async ( username, password) => {
        setStatus("pending");
        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.username));
            setUser(response.data.username);
            setStatus("done");
            navigate("/choice")
        } catch (error) {
            console.log(error);
            setStatus("error");
        }
    };

    const register = async (username, password, email, isLoading) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    username: username,
                    email: email,
                    password: password,
                    info: "dit is info",
                    role: ["user"],
                },
            );
            setStatus("done");
            console.log("successful registration")
            setLoading(false)
        } catch (error) {
            console.log(error);
            setStatus("error");
            setErrorMessage(error.response.data.message)
            console.log(error.response.data.message)

        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, status, setStatus, register, errorMessage, isLoading }}>
            {children}
        </AuthContext.Provider>);
};

export default AuthProvider;
