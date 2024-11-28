import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

import '../styles/footer.css';


const Footer = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (
        <div className='footer-container'>
            <div className='btnDiv'>
                <button
                    className='button'
                    onClick={() => navigate('/')}>
                        <span className="tooltip">ראשי</span>
                        <img src="/images/home-icon.png" alt="profile-icon" />
                </button>
                <button
                    className='button'
                    onClick={() => navigate('/my-favorites')}>
                        <span className="tooltip">בחירותיי</span>
                        <img src="/images/heart-icon.png" alt="profile-icon" />
                </button>
                {/* {user.isAdmin && 
                    <button
                        className='button' id='plus-button'
                        onClick={() => navigate('/new-training')}>
                            <span className="tooltip">הוסף שיעור</span>
                            <img src="/images/plus-icon.png" alt="profile-icon" />
                    </button>
                } */}
                <button
                    className='button'
                    onClick={() => navigate('/edit-profile')}>
                        <span className="tooltip">פרופיל</span>
                        <img src="/images/profile-icon.png" alt="profile-icon" />
                </button>

                <button
                    className='button'
                    onClick={() => navigate('/my-users')}>
                        <span className="tooltip">משתמשים</span>
                        <img src="/images/users-list-icon.png" alt="profile-icon" />
                    </button>

                {/* <button className='button'>משתתפים בשיעורים</button> */}
            </div>
        </div>
    )
}

export default Footer;
