"use client"; // Ensure it's a client component

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    // Check for the token cookie when the component mounts
    useEffect(() => {
        console.log("test")
        const token = document.cookie.split('; ');
        console.log("token", token);
        if (token[0] != '' && token.length > 0) {
            setLoggedIn(true); // Set to true if token exists
        } else if (token == null) {
            setLoggedIn(false); // Set to false if token does not exist
        }
    }, []); // Empty dependency array means this runs once on mount

    const login = () => {setLoggedIn(true)};
    const logout = () => setLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
