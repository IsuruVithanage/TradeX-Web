import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = ({ children }) => {
    const { accessToken } = useSelector((state) => state.auth);
    const userTemp = localStorage.getItem('user');
    const user = JSON.parse(userTemp);

    return accessToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;
