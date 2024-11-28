import React, { useEffect, useState } from 'react';
import '../styles/home.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [bookingStatus, setBookingStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); // State לשורת החיפוש

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
                console.error(error); // טיפול בשגיאות
            }
        };
        fetchData();
    }, []);

    // סינון הנתונים לפי שורת החיפוש
    const filteredData = data.filter((item) =>
        item.trainingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${item.TrainingGuideDetails.first} ${item.TrainingGuideDetails.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='home-container'>
            <h1>שיעורים</h1>

            {/* שורת חיפוש */}
            <input
                type="text"
                placeholder="חפש שיעור או מורה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <div className='class-card-container'>
                {filteredData.map((item, index) => (
                    <div key={index} className="class-card">
                        <div>
                            <h2>{item.trainingName}</h2>
                        </div>
                        <div>
                            <p><strong>מורה:</strong> {`${item.TrainingGuideDetails.first} ${item.TrainingGuideDetails.last}`}</p>
                            <p><strong>מתי?</strong> {item.time.time}</p>
                            <p>
                                <img src="/images/clock-icon.png" alt="profile-icon" className='icons' />
                                {item.time.time}
                            </p>
                            <p>
                                <img src="/images/peoples-icon.png" alt="profile-icon" className='icons' />
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
