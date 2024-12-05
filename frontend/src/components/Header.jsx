import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';


const Header = () => {
    const navigate = useNavigate();
    const { user, setUser, logout, theme, toggleTheme } = useContext(UserContext);
    const [theShortenName, setTheShortenName] = useState("אא");

    const shortenName = () => {

        const firstInitial = (user.firstName[0]).toUpperCase();
        const lastInitial = user.lastName[0].toUpperCase();
        
        setTheShortenName(`${firstInitial}${lastInitial}`);
    }

    useEffect(() => {
        const decodeAndSetUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    // const decodedData = jwtDecode(storedUser);
                    // setUser(decodedData);
                    // navigate('/');
                } catch (error) {
                    console.error("Failed to decode token:", error);
                }
            }
        };
        decodeAndSetUser();
        if (user) {
            shortenName()
        }
    }, [setUser, user]);

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
                <button className='btn-login' onClick={() => {logout(); navigate('/login');}}
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
