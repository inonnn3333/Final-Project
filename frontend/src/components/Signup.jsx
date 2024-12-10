import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserSignup } from '../validations/userValidation';
import '../styles/signUp.css'; 

function Signup() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(UserSignup), // שימוש בסכמה המיובאת
    });

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:1010/users', data);
            navigate('/login');
        } catch (err) {
            console.error('Error during signup:', err.response?.data?.message || err.message);
        }
    };

    return (
        <div className='signUp-container'>
            <div className="signUp-container-inner">
                <h2>רישום</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>שם פרטי:</label>
                        <input type="text" {...register('name.first')} />
                        {errors.name?.first && <p>{errors.name.first.message}</p>}
                    </div>
                    <div>
                        <label>שם משפחה:</label>
                        <input type="text" {...register('name.last')} />
                        {errors.name?.last && <p>{errors.name.last.message}</p>}
                    </div>
                    <div>
                        <label>פלאפון:</label>
                        <input type="tel" {...register('phone')} />
                        {errors.phone && <p>{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label>אימייל:</label>
                        <input type="email" {...register('email')} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label>סיסמא:</label>
                        <input type="password" {...register('password')} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div>
                        <label>עיר:</label>
                        <input type="text" {...register('address.city')} />
                        {errors.address?.city && <p>{errors.address.city.message}</p>}
                    </div>
                    <div>
                        <label>רחוב:</label>
                        <input type="text" {...register('address.street')} />
                        {errors.address?.street && <p>{errors.address.street.message}</p>}
                    </div>
                    <div>
                        <label>מס' בית:</label>
                        <input type="text" {...register('address.houseNumber')} />
                        {errors.address?.houseNumber && <p>{errors.address.houseNumber.message}</p>}
                    </div>
                    <button type="submit" className='btn'>הירשם</button>
                </form>
            </div>
                <button className= "btn btn-back" onClick={() => navigate('/login')}>חזרה להתחברות</button>
        </div>
    );
}

export default Signup;
