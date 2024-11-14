import React, {useContext, useEffect} from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const navigate = useNavigate();
    const { user, setUser, logout, theme, toggleTheme } = useContext(UserContext);

    useEffect(() => {
        const decodeAndSetUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    // const decodedData = jwtDecode(storedUser);
                    // setUser(decodedData);
                    navigate('/');
                } catch (error) {
                    console.error("Failed to decode token:", error);
                }
            }
        };
        decodeAndSetUser();
    }, [navigate, setUser]);

    return (
        <div>
            <button onClick={toggleTheme}>{theme}</button>
            {user ? (
                <button onClick={() => {
                    logout();
                    navigate('/login');
                }}>התנתק</button>
            ) : null}

            {user ? 
                <p> {`שלום ${user.firstName} ${user.lastName}`} </p>
                :
                <p>שלום אורח</p>            
            }
        </div>
    )
}

export default Header;
