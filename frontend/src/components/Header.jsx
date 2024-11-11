import React, {useContext} from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const { user, logout, theme, toggleTheme } = useContext(UserContext);

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
                <p>
                    שלום
                    {` ${user[0]}  ${user[1]}`}
                </p>
                :
                <p>שלום אורח</p>            
            }
        </div>
    )
}

export default Header;
