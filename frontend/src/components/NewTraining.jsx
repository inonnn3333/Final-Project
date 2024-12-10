import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { trainingSchema } from '../validations/trainingValidation';
import { useNotification } from './Notification';
import "../styles/newTraining.css"


function NewTraining() {
    const { user, setUser, decodeAndSetUser} = useContext(UserContext);
    const navigate = useNavigate();
    const { addNotification } = useNotification();


    // שימוש ב-react-hook-form עם joiResolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(trainingSchema), // שימוש בסכמת trainingSchema
        defaultValues: {
            trainingName: '',
            trainingDetailes: '',
            trainingTime: {
                date: '',
                time: '',
                length: '',
            },
            trainingGuideDetails: {
                first: '',
                last: '',
                phone: '',
                email: '',
            },
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:1010/trainings', data, {
                headers: {
                    authorization: localStorage.getItem('user'),
                },
            });
            navigate('/');
            addNotification('השיעור נוסף בהצלחה', 'success');

            return response;
        } catch (err) {
            if (err.status === 403) {
                addNotification('אימון קיים', 'warning');

            } else {
                addNotification('משהו השתבש. נסה שוב.', 'error');

            }
        }
    };

    // useEffect(() => {
    //     const userDetailes = decodeAndSetUser();        
    // }, []);

    return (
        <div className='newTraining-container'>
            <div className="newTraining-container-inner">
                <h2>הוספת שיעור חדש</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>שם השיעור:</label>
                        <input
                            type="text"
                            {...register('trainingName')}
                        />
                        {errors.trainingName && <p>{errors.trainingName.message}</p>}
                    </div>
                    <div>
                        <label>כמה מילים על השיעור</label>
                        <input
                            type="text"
                            {...register('trainingDetailes')}
                        />
                        {errors.trainingDetailes && <p>{errors.trainingDetailes.message}</p>}
                    </div>
                    <div>
                        <label>תאריך:</label>
                        <input
                            type="date"
                            {...register('trainingTime.date')}
                        />
                        {errors.trainingTime?.date && <p>{errors.trainingTime.date.message}</p>}
                    </div>
                    <div>
                        <label>שעה:</label>
                        <input
                            type="time"
                            {...register('trainingTime.time')}
                        />
                        {errors.trainingTime?.time && <p>{errors.trainingTime.time.message}</p>}
                    </div>
                    <div>
                        <label>אורך השיעור:</label>
                        <select
                            {...register('trainingTime.length')}
                        >
                            <option value="" disabled>בחר זמן</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                            <option value="60">60</option>
                        </select><span>{` דקות`}</span>
                        {errors.trainingTime?.length && <p>{errors.trainingTime.length.message}</p>}
                    </div>
                    <h3>פרטי המאמנ/ת</h3>
                    <div>
                        <label>שם פרטי:</label>
                        <input
                            type="text"
                            {...register('trainingGuideDetails.first')}
                        />
                        {errors.trainingGuideDetails?.first && <p>{errors.trainingGuideDetails.first.message}</p>}
                    </div>
                    <div>
                        <label>שם משפחה:</label>
                        <input
                            type="text"
                            {...register('trainingGuideDetails.last')}
                        />
                        {errors.trainingGuideDetails?.last && <p>{errors.trainingGuideDetails.last.message}</p>}
                    </div>
                    <div>
                        <label>מספר פלאפון:</label>
                        <input
                            type="tel"
                            {...register('trainingGuideDetails.phone')}
                        />
                        {errors.trainingGuideDetails?.phone && <p>{errors.trainingGuideDetails.phone.message}</p>}
                    </div>
                    <div>
                        <label>אימייל:</label>
                        <input
                            type="email"
                            {...register('trainingGuideDetails.email')}
                        />
                        {errors.trainingGuideDetails?.email && <p>{errors.trainingGuideDetails.email.message}</p>}
                    </div>
                    <button className='btn' type="submit">הוסף שיעור</button>
                </form>
            </div>
        </div>
    );
}

export default NewTraining;
