import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/footer.css';


const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className='btnDiv'>
            <button className='button' onClick={() => navigate('/')}>כל השיעורים</button>
            <button className='button' onClick={() => navigate('/my-favorites')}>שיעורים שהזמנתי</button>
            <button className='button' onClick={() => navigate('/my-users')}>הלקוחות שלי</button>
        </div>
    )
}

export default Footer
