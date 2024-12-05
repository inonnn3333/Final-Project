import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

import '../styles/footer.css';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation(); // כדי לקבל את ה-URL הנוכחי
    const { user } = useContext(UserContext);

    if (!user) return null;

    const isActive = (path) => location.pathname === path; // פונקציה שבודקת אם זה הדף הפעיל

    return (
        <div className='footer-container'>
            <div className='btnDiv'>
                <button
                    className={`button ${isActive('/') ? 'active' : ''}`}
                    onClick={() => navigate('/')}>
                        <span className="tooltip">ראשי</span>
                        <img src="/images/home-icon.png" alt="profile-icon" />
                </button>
                {user?.isAdmin === false && (
                    <button
                        className={`button ${isActive('/my-favorites') ? 'active' : ''}`}
                        onClick={() => navigate('/my-favorites')}>
                            <span className="tooltip">בחירותיי</span>
                            <img src="/images/heart-icon.png" alt="profile-icon" />
                    </button>
                )}
                {user?.isAdmin && (
                    <button
                        className={`button ${isActive('/new-training') ? 'active' : ''}`}
                        id='plus-button'
                        onClick={() => navigate('/new-training')}>
                            <span className="tooltip">הוסף שיעור</span>
                            <img src="/images/plus-icon.png" alt="profile-icon" />
                    </button>
                )}
                {user?.isAdmin === false && (
                    <button
                        className={`button ${isActive('/edit-profile') ? 'active' : ''}`}
                        onClick={() => navigate('/edit-profile')}>
                            <span className="tooltip">פרופיל</span>
                            <img src="/images/profile-icon.png" alt="profile-icon" />
                    </button>
                )}
                {user?.isAdmin && (
                    <button
                        className={`button ${isActive('/my-users') ? 'active' : ''}`}
                        onClick={() => navigate('/my-users')}>
                            <span className="tooltip">משתמשים</span>
                            <img src="/images/users-list-icon.png" alt="profile-icon" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Footer;
