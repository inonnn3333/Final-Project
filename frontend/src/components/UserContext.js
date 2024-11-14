import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    const login = (userData) => {
        const deCode = jwtDecode(userData);
        console.log(deCode);
        setUser(deCode);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');

    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, theme, toggleTheme }}>
            {children}
        </UserContext.Provider>
    );
};
