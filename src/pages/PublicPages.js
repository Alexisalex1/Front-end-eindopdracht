import {Route, Routes} from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import React from "react";
import PageNotFound from "./PageNotFound";

{/*Routes all different pages to certain url links. These are the pages these are only available before authentication (before logging in)*/}
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