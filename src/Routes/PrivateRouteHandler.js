import React from "react";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import { Navigate } from "react-router-dom";
import { getUser, getAccessToken } from "../Storage/SecureLs";


const PrivateRouteHandler = ({ permittedRole, children }) => {
    const token = getAccessToken();
    const user = getUser();
    const role = user ? user.role : "Guest";
    const levelOf = { "Guest": 0, "User": 1, "Trader": 2, "Admin": 3 };


    if (!token || role === 'Guest'){
        return <Navigate to='/' replace/>
    }

    else if (permittedRole === 'OnlyUser'){
        if(role === "User") {
            return children;
        }
        else {
            return <Unauthorized />;
        }
    }

    else {
        if(levelOf[role] < levelOf[permittedRole]) {
            return <Unauthorized />;
        } 
        else {
            return children;
        }
    }
};

export default PrivateRouteHandler;
