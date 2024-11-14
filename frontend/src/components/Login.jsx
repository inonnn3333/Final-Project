import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import '../styles/style.css'; // מייבא את קובץ ה-CSS
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login, toggleTheme } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {  
            setError('נא למלא את כל השדות');
            return;
        } 

        try {
            const response  = await axios.post('http://localhost:1010/users/login', {email, password});
            const token = response.data;
            
            if (token) {     
                login(token);
                navigate('/');
                setError('');
            }
        } catch {
            setError('Login failed. Please check your credentials.');
        }
    };

    useEffect(()=> {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            navigate('/');
        }

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            toggleTheme();
        }
    },[]);

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>התחברות</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-container">
                    <label htmlFor="email">אימייל:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">סיסמה:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">התחבר</button>
                <div>
                    <p>
                        אין לך חשבון?
                        <button onClick={() => navigate('/Signup')}>צור חשבון עכשיו</button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
