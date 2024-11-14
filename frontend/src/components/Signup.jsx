import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: { first: '', last: '' },
        phone: '',
        email: '',
        password: '',
        address: { city: '', street: '', houseNumber: '' },
        isAdmin: false,
        isBusiness: false,
        createAt: new Date().toISOString(),
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
            const response = await axios.post('http://localhost:1010/users', formData);
            navigate('/login') 
            return response;
        } catch (err) {
            if (err.status === 403) {
                console.error('משתמש קיים');
            } else {
                console.error('An error occurred:', err.message);
            }
            
        }
    };

    return (
        <div style={{marginBottom: "5em"}}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="name.first"
                    value={formData.name.first}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="name.last"
                    value={formData.name.last}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
            <label>City:</label>
            <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} required />
            </div>
            <div>
            <label>Street:</label>
            <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} required />
            </div>
            <div>
            <label>House Number:</label>
            <input type="number" name="address.houseNumber" value={formData.address.houseNumber} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default Signup;
