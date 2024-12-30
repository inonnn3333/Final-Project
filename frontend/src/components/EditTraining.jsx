import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from './Notification';
import { useLoader } from './LoaderContext';
import "../styles/editTraining.css"


function EditTraining() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [data, setData] = useState();
    const { addNotification } = useNotification();
    const { showLoader, hideLoader } = useLoader();


    const [formData, setFormData] = useState({
        trainingName: '',
        trainingDetailes: '',
        trainingTime: {
            date: '',
            time: '',
            length: ''
        },
        trainingGuideDetails: {
            first: '',
            last: '',
            phone: '',
            email: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
        const [mainField, subField] = name.split('.');
        setFormData({
            ...formData,
            [mainField]: {
            ...formData[mainField],
            [subField]: value,
            },
        });
        } else {
        setFormData({
            ...formData,
            [name]: value,
        });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        
        try {
            showLoader();
            const response = await axios.put(`http://localhost:1010/trainings/${id}`, formData, {
                headers: {
                    authorization: localStorage.getItem('user')
                }});
            navigate('/');
            addNotification('השיעור התעדכן בהצלחה.', 'success');

            return response;
        } catch (err) {
            console.error('An error occurred:', err.message);
            addNotification('הפעולה נכשלה. נסה שוב.', 'error');
        } finally {
                setTimeout(() => {
                    hideLoader();
                }, 1500);
            }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoader();
                const response = await axios.get(`http://localhost:1010/trainings/${id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }
                const trainings = response.data;
                setData(trainings);
                console.log(data);
                

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => {
                    hideLoader();
                }, 1500);
            }
        };

        fetchData();
}, [user]);

    return (
        <div className='editTraining-container'>
            <div className='editTraining-container-inner'>
                <h2>עריכת שיעור</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>שם השיעור:</label>
                        <input
                            type="text"
                            name="trainingName"
                            value={formData.trainingName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>פרטי השיעור:</label>
                        <input
                            type="text"
                            name="trainingDetailes"
                            value={formData.trainingDetailes}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>תאריך:</label>
                        <input
                            type="date"
                            name="trainingTime.date"
                            value={formData.trainingTime.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>שעה:</label>
                        <input
                            type="time"
                            name="trainingTime.time"
                            value={formData.trainingTime.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>אורך השיעור:</label>
                        <select
                            name="trainingTime.length"
                            value={formData.trainingTime.length}
                            onChange={handleChange}
                            required
                        >
                            <option value="בחר זמן" disabled>בחר זמן</option>
                            <option value="30">30</option>
                            <option value="30">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                            <option value="60">60</option>
                        </select><span>{` דקות`}</span>
                    </div>
                        <h3>שם מורה</h3>
                    <div>
                        <label>שם פרטי:</label>
                        <input
                            type="text"
                            name="trainingGuideDetails.first"
                            value={formData.trainingGuideDetails.first}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>שם משפחה:</label>
                        <input
                            type="text"
                            name="trainingGuideDetails.last"
                            value={formData.trainingGuideDetails.last}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>פלאפון:</label>
                        <input
                            type="text"
                            name="trainingGuideDetails.phone"
                            value={formData.trainingGuideDetails.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>אימייל:</label>
                        <input
                            type="text"
                            name="trainingGuideDetails.email"
                            value={formData.trainingGuideDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='btn' type="submit">עדכן שיעור</button>
                </form>
            </div>
        </div>
    );
}
export default EditTraining;
