import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './Notification';
import { useLoader } from './LoaderContext';
import '../styles/home.css';
import Notes from './Notes';

const Home = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [bookingStatus, setBookingStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const { user, setUser , decodeAndSetUser } = useContext(UserContext);
    const { addNotification } = useNotification();
    const { showLoader, hideLoader } = useLoader();


    const handleEditClick = (lessonId) => {
        navigate(`/edit-training/${lessonId}`)
    };


    const handleBooking = async (index, trainingId) => {
        try {
            showLoader();
            const userDetailes = await decodeAndSetUser();
            setUser(userDetailes);
            const userId = user._id; // ה-ID של המשתמש, כנראה נלקח מ-context או state

            const response = await axios.patch(
                `http://localhost:1010/trainings/${trainingId}`,
                { userId }, // הגוף של הבקשה
                {
                    headers: {
                        authorization: localStorage.getItem('user'), // ה-token מה-localStorage
                    },
                }
            );

            setBookingStatus((prevStatus) => ({
                ...prevStatus,
                [index]: !prevStatus[index], // עדכון המצב לפי הפעולה
            }));
            addNotification('הפעולה בוצעה בהצלחה', 'success');
            return response;

        } catch (error) {
            console.error('Error updating booking:', error.response?.data || error.message);
            addNotification('משהו לא הצליח. נסה להתחבר מחדש.', 'error');
        } finally {
                setTimeout(() => {
                    hideLoader();
                }, 1500);
            }
    };

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm("האם ברצונך למחוק את האימון?");
        if (confirmDelete) {
            try {
                showLoader();
                await axios.delete(`http://localhost:1010/trainings/${itemId}`, {
                    headers: {
                        authorization: localStorage.getItem('user'),
                    },
                });
                setData((prevData) => prevData.filter((user) => user._id !== itemId));
                addNotification('המחיקה בוצעה בהצלחה', 'success');

            } catch (error) {
                console.error("Error deleting item:", error);
                addNotification('משהו השתבש, נסה שוב', 'error');
            } finally {
                setTimeout(() => {
                    hideLoader();
                }, 1500);
            }
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoader();
                const response = await axios.get('http://localhost:1010/trainings');

                const trainings = response.data;

                setData(trainings);
                
                // יצירת מצב ראשוני לסטטוס הכפתורים
                const initialStatus = {};
                
                trainings.forEach((training, index) => {
                    // בדיקה אם המשתמש כבר ברשימת המשתתפים
                    const isRegistered = training.participants.includes(user._id);
                    initialStatus[index] = isRegistered; // true אם המשתמש רשום, אחרת false                    
                });

                setBookingStatus(initialStatus); // עדכון הסטטוס של כל הכפתורים
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => {
                    hideLoader();
                }, 1500);
            }
        };

        fetchData();
    }, [user]);


        const filteredData = data.filter((item) =>
        item.trainingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${item.trainingGuideDetails.first} ${item.trainingGuideDetails.last}`.toLowerCase().includes(searchQuery.toLowerCase())
        
    );


    return (
        <div className='home-container'>
            <h1>שיעורים</h1>

            <div>
                <Notes/>
            </div>

            <input
                type="text"
                placeholder="חפש שיעור או מורה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"   
            />
            
            <div className='class-card-container'>
                {filteredData.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '2em', color: '#888' }}>לא נמצא שיעור או מורה</p>
                ) : (
                    filteredData.map((item, index) => (
                        <div key={index} className="class-card">
                            <div>
                                <h2>{item.trainingName}</h2>
                                <p>{`${item.trainingGuideDetails.first} ${item.trainingGuideDetails.last}`}</p>
                            </div>
                            <div>
                                <p>
                                    <img src="/images/date-icon.png" alt="date-icon" className='icons' />
                                    {`  ${item.trainingTime.time}  |  ${item.trainingTime.date}`}
                                </p>
                                <p>
                                    <img src="/images/clock-icon.png" alt="clock-icon" className='icons' />
                                    {`  ${item.trainingTime.length}  דקות`}
                                </p>
                                <p>
                                    <img src="/images/peoples-icon.png" alt="profile-icon" className='icons' />
                                    {`  ${item.participants.length}`}
                                </p>
                            </div>
                            {user?.isAdmin === false && (
                                <div>
                                    <button
                                        onClick={() => handleBooking(index, item._id)}
                                        className="button-home"
                                        disabled={item.participants.length >= 25}
                                        style={{ backgroundColor: bookingStatus[index] ? '#A9C46C' : null }}
                                        >
                                        {item.participants.length >= 25 
                                            ? 'השיעור מלא' 
                                            : bookingStatus[index] 
                                                ? 'בטל תור' 
                                                : 'תפוס תור'
                                        }
                                    </button>
                                </div>
                            )}
                            {user?.isAdmin && (
                            <div className='admin-button'>
                                <button className='admin-btn-inner delete-button' onClick={() => handleDelete(item._id)}>
                                    <img src="/images/trash-icon.png" alt="trash-icon" />
                                    מחיקה
                                </button>
                                <button className='admin-btn-inner edit-button' onClick={() => handleEditClick(item._id)}>
                                    <img src="/images/edit-icon.png" alt="edit-icon" />
                                    עריכה
                                </button>
                            </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );

};

export default Home;