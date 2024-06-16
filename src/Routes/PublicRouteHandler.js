import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, getAccessToken } from "../Storage/SecureLs";


const PublicRouteHandler = ({ behavior, children }) => {
    const token = getAccessToken();
    const user = getUser();
    const path = (user && user.role === "admin") ? "/admin" : "/watchlist";


    switch(behavior){
        case "Redirect": {
            return !token ? children : <Navigate to={ path } replace/> ;
        }

        case "Redirect at beginning": {
            return !token ? children : <Navigate to={ path } replace/> ;
        }

        default: {
            return children;
        }
    }
};

export default PublicRouteHandler;
