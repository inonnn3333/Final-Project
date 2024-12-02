import React, { useEffect, useState } from 'react';
import '../styles/style.css'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


const Users = () => {
    // const navigate = useNavigate();
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


    const handleAdmin = async (isAdmin, userId) => {
    const confirmChange = isAdmin
        ? window.confirm("האם ברצונך להפוך את המשתמש ללקוח?")
        : window.confirm("האם ברצונך להפוך את המשתמש למנהל?");
    
    if (confirmChange) {
        try {
            const response = await axios.patch(`http://localhost:1010/users/${userId}`, {
                headers: {
                    authorization: localStorage.getItem('user'),
                },
            });

            const updatedUser = response.data; // קבלת המשתמש המעודכן מהשרת

            setData((prevData) =>
                prevData.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );
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

                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    },[]);

    return (
        <div>
            {
            // !data ? 
            // <div>
            //     <h1>אין לך הרשאות לדף זה</h1>
            //     <button onClick={() => {navigate('/home')}}>חזרה לדף הראשי</button>
            // </div>
            // :
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
                        <th>לקוח/מנהל</th>
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
                            <td>
                                <button onClick={() => handleAdmin(user.isAdmin, user._id)}>
                                    {user.isAdmin ? <p>מנהל</p> : <p>לקוח</p>}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>
                                    <img src="/images/trash-icon.png" alt="trash-icon" className='icons' />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default Users;
