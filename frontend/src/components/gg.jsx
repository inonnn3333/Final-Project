import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function MyProfile() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);


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
            <h2>עריכת פרופיל</h2>
            <button onClick={()=> {console.log(user);}}>Click here</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>שם פרטי</label>
                    <input
                        type="text"
                        name="trainingName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>שם משפחה:</label>
                    <input
                        type="text"
                        name="trainingDetailes"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>מספר פלאפון:</label>
                    <input
                        type="text"
                        name="TrainingTime.date"
                        value={formData.TrainingTime.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>כתובת אימייל:</label>
                    <input
                        type="text"
                        name="TrainingTime.time"
                        value={formData.TrainingTime.time}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <h3>כתובת</h3>
                <div>
                    <label>עיר:</label>
                    <input
                        type="text"
                        name="TrainingTime.length"
                        value={formData.TrainingTime.length}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>רחוב:</label>
                    <input
                        type="text"
                        name="TrainingGuideDetails.first"
                        value={formData.TrainingGuideDetails.first}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>מספר בית:</label>
                    <input
                        type="text"
                        name="TrainingGuideDetails.last"
                        value={formData.TrainingGuideDetails.last}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">שמור שינויים:</button>
            </form>
        </div>
    );
}

export default MyProfile;
