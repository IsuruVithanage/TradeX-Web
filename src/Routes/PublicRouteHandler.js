import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../Storage/SecureLs";


const PublicRouteHandler = ({ behavior, children }) => {
    const token = getAccessToken();


    switch(behavior){
        case "Redirect": {
            return !token ? children : <Navigate to='/watchlist' replace/> ;

        }

        case "Redirect at beginning": {
            return !token ? children : <Navigate to='/watchlist' replace/> ;
        }

        default: {
            return children;
        }
    }
};

export default PublicRouteHandler;
