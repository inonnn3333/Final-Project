import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from './Notification';
import '../styles/login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(UserContext);
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

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
            addNotification('ההתחברות נכשלה. נסה שוב.', 'error');
        }
    };

    if (user) return navigate('/')

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <form onSubmit={handleSubmit} className='form-class'>
                        <h2>התחברות</h2>
                        <div className="input-class">
                            <div className="input-container">
                                <input
                                    className= "in"
                                    type="email"
                                    id="email"
                                    value={email}
                                    placeholder='אימייל'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    className= "in"
                                    type="password"
                                    id="password"
                                    value={password}
                                    placeholder='סיסמא'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn">התחבר</button>
                            {error && <p className="err">{error}</p>}
                        </div>

                        <div>
                            <button className='btn btn-new' onClick={() => navigate('/Signup')}>חשבון חדש</button>
                        </div>
                    </form>
                </div>
            
                <div className="app-info">
                    {!isOpen && (
                        <>
                            <h1>MyFit</h1>
                            <p>האפליקציה המושלמת לניהול והזמנת שיעורי ספורט</p>
                            <button onClick={toggleDetails} className='info-button'>
                                <img src="/images/arrow-down.png" alt="arrow-down" />    
                            </button>
                        </>
                    )}
                    

                    {isOpen && (
                        <div className='app-info-open'>
                            <h3>מה תוכלו לעשות באפליקציה?</h3>
                            <ul>
                                <li>לצפות בלוח השיעורים ולמצוא את השיעור המתאים לכם.</li>
                                <li>להירשם לשיעורים בקלות ובמהירות.</li>
                                <li>לנהל את ההרשמות שלכם ולשמור על שגרת האימונים.</li>
                            </ul>

                            <h3>איך זה עובד?</h3>
                            <ol>
                                <li>הירשמו לאפליקציה בקלות על ידי יצירת חשבון אישי.</li>
                                <li>
                                לאחר ההתחברות, תוכלו לגלות שיעורים חדשים, להירשם בלחיצת כפתור וליהנות מחוויית אימונים
                                משודרגת.
                                </li>
                                <li>עקבו אחר היסטוריית האימונים שלכם וקבלו התראות על שיעורים קרובים.</li>
                            </ol>

                            <p>הצטרפו אלינו ותהפכו את שגרת האימונים שלכם לנוחה ומדויקת יותר!</p>
                            <button onClick={toggleDetails} className='info-button'>
                                <img src="/images/arrow-up.png" alt="arrow-up"/>    
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
