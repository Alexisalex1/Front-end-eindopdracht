import {Route, Routes} from "react-router-dom";
import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/RegisterForm";
import React from "react";
import PageNotFound from "./PageNotFound";


function PublicPages() {
    return(
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<LoginForm/>}/>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default PublicPages;