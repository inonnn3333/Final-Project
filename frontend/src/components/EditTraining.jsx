import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function EditTraining() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [data, setData] = useState();

    const [formData, setFormData] = useState({
        trainingName: '',
        trainingDetailes: '',
        time: {
            date: '',
            time: '',
            length: ''
        },
        TrainingGuideDetails: {
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
            const response = await axios.put(`http://localhost:1010/trainings/${id}`, formData, {
                headers: {
                    authorization: localStorage.getItem('user')
                }});
            navigate('/');
            return response;
        } catch (err) {
            console.error('An error occurred:', err.message);            
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1010/trainings/${id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }
                const trainings = response.data;
                setData(trainings);
                console.log(data);
                

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
}, [user]);

    return (
        <div style={{margin: "5em"}}>
            <div>
                <h2>עריכת שיעור</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>שם השיעור:</label>
                        <input
                            type="text"
                            name="trainingName"
                            // value={data.trainingName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>פרטי השיעור</label>
                        <input
                            type="text"
                            name="trainingDetailes"
                            // value={data.trainingDetailes}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>תאריך:</label>
                        <input
                            type="text"
                            name="time.date"
                            // value={data.time.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>שעה:</label>
                        <input
                            type="text"
                            name="time.time"
                            // value={item.time.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>אורך השיעור:</label>
                        <input
                            type="text"
                            name="time.length"
                            // value={item.time.length}
                            onChange={handleChange}
                            required
                        />
                    </div>
                        <h3>שם מורה</h3>
                    <div>
                        <label>שם פרטי:</label>
                        <input
                            type="text"
                            name="TrainingGuideDetails.first"
                            // value={item.TrainingGuideDetails.first}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>שם משפחה:</label>
                        <input
                            type="text"
                            name="TrainingGuideDetails.last"
                            // value={item.TrainingGuideDetails.last}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>פלאפון:</label>
                        <input
                            type="text"
                            name="TrainingGuideDetails.phone"
                            // value={item.TrainingGuideDetails.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>אימייל:</label>
                        <input
                            type="text"
                            name="TrainingGuideDetails.email"
                            // value={item.TrainingGuideDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">עדכן שיעור</button>
                </form>
            </div>
        </div>
    );
}

export default EditTraining;
