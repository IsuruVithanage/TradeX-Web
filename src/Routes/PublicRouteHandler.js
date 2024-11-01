import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, getAccessToken } from "../Storage/SecureLs";


const PublicRouteHandler = ({ children }) => {
    const token = getAccessToken();
    const user = getUser();

    if(!token || !user){
        return children;
    } else {
        if(user.role === "admin"){
            return <Navigate to="/admin" replace/>
        } else {
            return <Navigate to="/watchlist" replace/>
        }
    }
};

export default PublicRouteHandler;
