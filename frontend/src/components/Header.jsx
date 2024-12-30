import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from "jwt-decode";
import { useLoader } from './LoaderContext';
import '../styles/header.css';


const Header = () => {
    const navigate = useNavigate();
    const { user, setUser, logout, theme, toggleTheme, decodeAndSetUser } = useContext(UserContext);
    const [theShortenName, setTheShortenName] = useState("אא");
    const { showLoader, hideLoader } = useLoader();

    const shortenName = () => {

        const firstInitial = (user.firstName[0]).toUpperCase();
        const lastInitial = user.lastName[0].toUpperCase();
        
        setTheShortenName(`${firstInitial}${lastInitial}`);
    }

    const logoutFunction = () => {
        showLoader();
        logout();
        setTimeout(() => {
            hideLoader();
        }, 1500);
        navigate('/login');
    }

    useEffect(() => {
        decodeAndSetUser();
        if (user) {
            shortenName()
        }
    }, []);

    return (
        <div className='header-container'>
            <button className="btn-icons" onClick={toggleTheme}>
                <img
                    src={theme === "light" ? "/images/sun-icon.png" : "/images/moon-icon.png"}
                    alt={theme === "light" ? "sun-icon" : "moon-icon"}
                    className="icons"
                />
            </button>
            {user ? (
                <button className='btn-login' onClick={() => {logoutFunction()}}
                >
                    <img src="/images/logout-icon.png" alt="logout-icon" className='icons'/>
                    התנתק
                </button>
                ) : null
            }
            <div className='name-container'>
                {user ? 
                    <p> {theShortenName} </p>
                    :
                    <img src="/images/profile-black-icon.png" alt="profile-black-icon" className='icons'/>           
                }
            </div>
        </div>
    )
}

export default Header;
