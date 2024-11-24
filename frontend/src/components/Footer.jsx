import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/footer.css';


const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className='footer-container'>
            <div className='btnDiv'>
                <button
                    className='button'
                    onClick={() => navigate('/')}>
                        <img src="/images/home-icon.png" alt="profile-icon" />
                </button>
                <button
                    className='button'
                    onClick={() => navigate('/my-favorites')}>
                        <img src="/images/heart-icon.png" alt="profile-icon" />
                </button>
                <button
                    className='button'
                    onClick={() => navigate('/')}>
                        <img src="/images/profile-icon.png" alt="profile-icon" />
                </button>

                <button
                    className='button'
                    onClick={() => navigate('/my-users')}>
                        <img src="/images/users-list-icon.png" alt="profile-icon" />
                    </button>

                {/* <button className='button'>משתתפים בשיעורים</button> */}
            </div>
        </div>
    )
}

export default Footer;
