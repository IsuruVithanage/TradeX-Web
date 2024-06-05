// src/contexts/AuthProviderWithNavigate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

function AuthProviderWithNavigate({ children }) {
    const navigate = useNavigate();

    return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
}

export default AuthProviderWithNavigate;
