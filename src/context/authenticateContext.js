import React, { createContext, useEffect, useState } from "react";
import axios from "axios";



export const AuthenticateContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAuthState({
                user: null,
                status: "done",
            });
            return;
        }
        try {
            const response = await axios.get(
                "https://frontend-educational-backend.herokuapp.com/api/test/all",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { user } = response.data;
            if (user) {
                setAuthState({
                    user: user,
                    status: "done",
                });
            } else {
                setAuthState({
                    user: null,
                    status: "done",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };


    const login = async (username, password) => {
        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signin",
                {
                    "username" : username,
                    "password" : password,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            const { accessToken, user } = response.data;
            localStorage.setItem("accessToken", accessToken);
            setAuthState({
                user: user,
                status: "done",
            });
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };


    const signup = async (username, email, password) => {
        if (!email.includes('@')) {
            console.error('Invalid email address');
            return;
        }

        if (username.length < 6 || password.length < 6) {
            console.error('Username and password must be at least 6 characters');
            return;
        }

        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    "username" : username,
                    "email" : email,
                    "password" : password,
                    "info" : "dit is info",
                    "role" : ["user"],
                },
                { headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer xxx.xxx.xxx",
                    }}
            );

            const { token, user: newUser } = response.data;
            localStorage.setItem("token", token);
            setAuthState({
                user: newUser,
                status: "done",

            });console.log(response.data)
            console.log("well done")
        } catch (error) {
            if (error.response.status === 409) {
                console.error('Username already exists');
            } else {
                console.error(error);
            }
        }
    };

    const data = {
        ...authState,
        login: login,
        signup: signup,
    };

    return (
        <AuthenticateContext.Provider value={data}>
           children}
        </AuthenticateContext.Provider>
    );
}


