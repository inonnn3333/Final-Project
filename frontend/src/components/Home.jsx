import React, { useEffect, useState } from 'react';
import '../styles/home.css';


const Home = () => {
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
                const response = await fetch('http://localhost:1010/trainings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                } catch (error) {
                //! setError(error);
            } finally {
                //! setLoading(false);
            }
        }
        fetchData();
    },[]);


    return (
        <div className='home-container'>
            <h1>שיעורים</h1>
            <div className='class-card-container'>
                {data.map((item, index) => (
                    <div key={index} className="class-card">
                        <div>
                            <h2>{item.trainingName}</h2>
                        </div>
                        <div>
                            <p><strong>מורה:</strong> {`${item.TrainingGuideDetails.first} ${item.TrainingGuideDetails.last}`}</p>
                            <p><strong>מתי?</strong> {item.time.time}</p>
                            <p>
                                <img src="/images/clock-icon.png" alt="profile-icon" className='icons'/>
                                {item.time.time}</p>
                            <p>
                                <img src="/images/peoples-icon.png" alt="profile-icon" className='icons'/>
                                {item.participants.join}
                            </p>
                        </div>
                        <div>
                            <button onClick={() => handleBooking(index)} className='button-home'>
                                {bookingStatus[index] ? 'בטל תור' : 'תפוס תור'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
