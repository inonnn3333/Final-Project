import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { UserContext } from './UserContext';
import axios from 'axios';
import { EditUser } from '../validations/userValidation'; // ייבוא סכמת הוולידציה
import { useNotification } from './Notification';


function MyProfile() {
    const { user } = useContext(UserContext);
    const { addNotification } = useNotification();


    // שימוש ב-react-hook-form עם joiResolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(EditUser), // שימוש בסכמת EditUser
        defaultValues: {
            name: {
                first: user?.name?.first || '',
                last: user?.name?.last || '',
            },
            phone: user?.phone || '',
            address: {
                city: user?.address?.city || '',
                street: user?.address?.street || '',
                houseNumber: user?.address?.houseNumber || '',
            },
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://localhost:1010/users/${user._id}`, data, {
                headers: {
                    authorization: localStorage.getItem('user'),
                },
            });
            addNotification('הפרופיל עודכן בהצלחה', 'success');
            return response;
        } catch (err) {
            addNotification('הפרופיל לא עודכן. נסה שוב.', 'error');

        }
    };

    return (
        <div style={{ margin: '5em' }}>
            <h2>עריכת פרופיל</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>שם פרטי</label>
                    <input type="text" {...register('name.first')} />
                    {errors.name?.first && <p>{errors.name.first.message}</p>}
                </div>
                <div>
                    <label>שם משפחה:</label>
                    <input type="text" {...register('name.last')} />
                    {errors.name?.last && <p>{errors.name.last.message}</p>}
                </div>
                <div>
                    <label>מספר פלאפון:</label>
                    <input type="text" {...register('phone')} />
                    {errors.phone && <p>{errors.phone.message}</p>}
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
                    <label>מספר בית:</label>
                    <input type="text" {...register('address.houseNumber')} />
                    {errors.address?.houseNumber && <p>{errors.address.houseNumber.message}</p>}
                </div>
                <button type="submit">שמור שינויים</button>
            </form>
        </div>
    );
}

export default MyProfile;
