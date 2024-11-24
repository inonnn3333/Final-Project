import React, { useEffect, useState } from 'react';
import '../styles/style.css'
import axios from 'axios';

const Users = () => {

    const [data, setData] = useState([]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("האם ברצונך למחוק את המשתמש?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:1010/users/${userId}`, {
                    headers: {
                        authorization: localStorage.getItem('user'),
                    },
                });
                setData((prevData) => prevData.filter((user) => user._id !== userId));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1010/users', {
                    headers: {
                        authorization: localStorage.getItem('user'),
                    }}
                );

                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    },[]);

    return (
        <div>
            <h1>הלקוחות שלי</h1>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>
                    <th>טלפון</th>
                    <th>אימייל</th>
                    <th>עיר</th>
                    <th>רחוב</th>
                    <th>מס' בית</th>
                    <th>תאריך יצירת חשבון</th>
                    <th>פעיל</th>
                    <th>מחק</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user, index) => (
                    <tr key={index}>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.address.city}</td>
                        <td>{user.address.street}</td>
                        <td>{user.address.houseNumber}</td>
                        <td>{user.createAt}</td>
                        <td>{user.isActive ? "כן" : "לא"}</td>
                        <td>
                            <button onClick={() => handleDelete(user._id)}>
                                    מחק משתמש
                                </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default Users;
