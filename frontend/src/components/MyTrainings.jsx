import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import '../styles/home.css';
import axios from 'axios';
import { useNotification } from './Notification';


const MyFavoiretes = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const { addNotification } = useNotification();


    const handleBooking = async (trainingId) => {
        try {
            const userId = user._id;

            const response = await axios.patch(
                `http://localhost:1010/trainings/${trainingId}`,
                { userId },
                {
                    headers: {
                        authorization: localStorage.getItem('user'),
                    },
                }
            );
            const updatedTraining = response.data;

            if (!updatedTraining.participants.includes(userId)) {
                setData((prevData) =>
                    prevData.filter((item) => item._id !== trainingId)
                );
            } else {
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === updatedTraining._id ? updatedTraining : item
                    )
                );
            }
        } catch (error) {
            addNotification('יש בעיה, התחבר שוב', 'error');
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1010/trainings/my-trainings/${user._id}`, {
                    headers: {
                        authorization: localStorage.getItem('user'),
                    },
                });
                setData(response.data);
            } catch (err) {
                addNotification('לא נבחרו שיעורים', 'info');
            }
        };
        fetchData();
    }, []);



    return (
        <div>
            <h1>שיעורים שהזמנתי</h1>
            <div>
                {
                    data.length === 0 ? ( // בדיקה אם אין שיעורים
                        <p>אין שיעורים שהוזמנו</p>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className="classCard">
                                <h2>{item.trainingName}</h2>
                                <p><strong>מורה:</strong> {item.trainingGuideDetails.first + ' ' + item.trainingGuideDetails.last}</p>
                                <p><strong>תאריך:</strong> {item.trainingTime.date}</p>
                                <p><strong>שעה:</strong> {item.trainingTime.time}</p>
                                <p><strong>מספר משתתפים:</strong> {item.trainingTime.length}</p>
                                <div>
                                    <button onClick={() => handleBooking(item._id)} className="button-home">
                                        {item.participants.includes(user._id) ? 'בטל תור' : 'תפוס תור'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default MyFavoiretes;
