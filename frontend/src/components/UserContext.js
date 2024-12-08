import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
// import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    const login = async (userData) => {
        localStorage.setItem('user', userData);
        decodeAndSetUser()
    };

    const decodeAndSetUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const decodedData = jwtDecode(storedUser);
                    // console.log("console says", decodedData);
                    setUser(decodedData);
                    return decodedData;
                } catch (error) {
                    console.error("Failed to decode token:", error);
                }
            }
        };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    
    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //     const decodedData = jwtDecode(storedUser);
        //     setUser(decodedData);
        // }
        decodeAndSetUser()

        const storedTheme = localStorage.getItem('theme') || 'light';
        if (storedTheme) {
            setTheme(storedTheme);
            document.body.setAttribute('data-theme', storedTheme);
        }
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser, login, logout, theme, toggleTheme, decodeAndSetUser}}>
            {children}
        </UserContext.Provider>
    );
};
