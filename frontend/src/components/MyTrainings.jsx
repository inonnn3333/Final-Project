import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import axios from 'axios';

const MyFavoiretes = () => {
    const [data, setData] = useState([]);
    const [bookingStatus, setBookingStatus] = useState({});

    const handleBooking = (index) => {
        setBookingStatus((prevStatus) => ({
        ...prevStatus,
        [index]: !prevStatus[index] // הופך את המצב של כל שיעור בין true ל-false
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1010/trainings/my-trainings', {
                    headers: {
                        authorization: localStorage.getItem('user')
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
            <h1>שיעורים שהזמנתי</h1>
            <div>
                {
                    data ? <p>אין שיעורים נבחרים</p> :
                    data.map((item, index) => (
                        <div key={index} className="classCard">
                            <h2>{item.trainingName}</h2>
                            <p><strong>מורה:</strong> {item.TrainingGuideDetails.first + item.TrainingGuideDetails.last}</p>
                            <p><strong>תאריך:</strong> {item.time.date}</p>
                            <p><strong>שעה:</strong> {item.time.time}</p>
                            <p><strong>משתתפים:</strong> {item.participants.join}</p>
                            <div>
                                <button onClick={() => handleBooking(index)}>
                                    {bookingStatus[index] ? 'בטל תור' : 'תפוס תור'}
                                </button>
                            </div>
                        </div>
                ))
                }
            </div>

        </div>
    );
};

export default MyFavoiretes;
