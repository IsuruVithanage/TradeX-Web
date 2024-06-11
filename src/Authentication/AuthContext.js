import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, navigate }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            setCurrentUser({ token });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('access-token', token);
        setCurrentUser({ token });
        navigate('/watchlist'); // Redirect to a protected route after login
    };

    const logout = () => {
        localStorage.removeItem('access-token');
        setCurrentUser(null);
        navigate('/'); // Redirect to login page after logout
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
