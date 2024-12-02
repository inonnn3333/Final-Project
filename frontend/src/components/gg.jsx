import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


function MyProfile() {
    // const navigate = useNavigate();
    const { user, } = useContext(UserContext);



    const [formData, setFormData] = useState({
        name: {
            first: '',
            last: ''
        },
        phone: '',
        address: {
            city: '',
            street: '',
            houseNumber: ''
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
            const response = await axios.put(`http://localhost:1010/users/${user._id}`, formData, {
                    headers: {
                        authorization: localStorage.getItem('user')
                    }});
            return response;
        } catch (err) {
            console.error('An error occurred:', err.message);            
        }
    };
    

    return (
        <div style={{margin: "5em"}}>
            <h2>עריכת פרופיל</h2>
            <button onClick={()=> {console.log(user);}}>Click here</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>שם פרטי</label>
                    <input
                        type="text"
                        name="name.first"
                        // value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>שם משפחה:</label>
                    <input
                        type="text"
                        name="name.last"
                        // value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>מספר פלאפון:</label>
                    <input
                        type="text"
                        name="phone"
                        // value={formData.TrainingTime.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>כתובת אימייל:</label>
                    <input
                        type="text"
                        name="email"
                        // value={formData.TrainingTime.time}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <h3>כתובת</h3>
                <div>
                    <label>עיר:</label>
                    <input
                        type="text"
                        name="address.city"
                        // value={formData.TrainingTime.length}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>רחוב:</label>
                    <input
                        type="text"
                        name="address.street"
                        // value={formData.TrainingGuideDetails.first}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>מספר בית:</label>
                    <input
                        type="text"
                        name="address.houseNumber"
                        // value={formData.TrainingGuideDetails.last}
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
