import React, { useState } from 'react';
// import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NewTraining() {
    // const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    trainingName: '',
    trainingDetailes: '',
    TrainingTime: {
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
        try {
            const response = await axios.post('http://localhost:1010/trainings', formData, {
                    headers: {
                        authorization: localStorage.getItem('user')
                    }});
            navigate('/') 
            return response;
        } catch (err) {
            if (err.status === 403) {
                console.error('אימון קיים');
            } else {
                console.error('An error occurred:', err.message);
            }
            
        }
    };

    return (
        <div style={{marginBottom: "5em"}}>
        <h2>הוספת שיעור חדש</h2>
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
                <label>כמה מילים על השיעור</label>
                <input
                    type="text"
                    name="trainingDetailes"
                    value={formData.trainingDetailes}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>יום:</label>
                <input
                    type="text"
                    name="TrainingTime.date"
                    value={formData.TrainingTime.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>שעה:</label>
                <input
                    type="text"
                    name="TrainingTime.time"
                    value={formData.TrainingTime.time}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>אורך השיעור:</label>
                <input
                    type="text"
                    name="TrainingTime.length"
                    value={formData.TrainingTime.length}
                    onChange={handleChange}
                    required
                />
            </div>
            <h3>פרטי המאמנ/ת</h3>
            <div>
                <label>שם פרטי:</label>
                <input
                    type="text"
                    name="TrainingGuideDetails.first"
                    value={formData.TrainingGuideDetails.first}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>שם משפחה:</label>
                <input
                    type="text"
                    name="TrainingGuideDetails.last"
                    value={formData.TrainingGuideDetails.last}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>מספר פלאפון:</label>
                <input
                    type="text"
                    name="TrainingGuideDetails.phone"
                    value={formData.TrainingGuideDetails.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>אימייל:</label>
                <input
                    type="text"
                    name="TrainingGuideDetails.email"
                    value={formData.TrainingGuideDetails.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">הוסף שיעור</button>
        </form>
        </div>
    );
}

export default NewTraining;
