import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/notes.css';
import { UserContext } from './UserContext';


const Notes = () => {
    const [data, setData] = useState([]);
    const [editBox, setEditBox] = useState(false);
    const [formData, setFormData] = useState({content: '', timestamp: ''});
    const { user } = useContext(UserContext);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({content: e.target.value, timestamp: `${moment().format('DD.MM.YYYY')}`});
    }

    const handleEdit = async (itemId) => {
        const newMessage = window.prompt("הכנס את ההודעה החדשה:");
        if (newMessage) {
            try {
                await axios.patch(`http://localhost:1010/messages/${itemId}`, {content: newMessage});
                setData((prevData) => prevData.map((item) => {
                    if (item._id === itemId) {
                        return {...item, content: newMessage};
                    }
                    return item;
                }));
            } catch (error) {
                console.error('Error updating message:', error.response?.data || error.message);
            }
        }
}
    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm("האם ברצונך למחוק את האימון?");
        if (confirmDelete) {
            try {
                // showLoader();
                await axios.delete(`http://localhost:1010/messages/${itemId}`, {});
                setData((prevData) => prevData.filter((user) => user._id !== itemId));
                // addNotification('המחיקה בוצעה בהצלחה', 'success');

            } catch (error) {
                console.error("Error deleting item:", error);
                // addNotification('משהו השתבש, נסה שוב', 'error');
            } finally {
                setTimeout(() => {
                    // hideLoader();
                }, 1500);
            }
        }
    };

    const addNewMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1010/messages', formData);
            setData([...data, response.data]);
            setEditBox(false);
        } catch (error) {
            console.error('Error adding new message:', error.response?.data || error.message);}
    }

    useEffect(() => {     
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1010/messages');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
            } finally {
                // hideLoader();    
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className='message-box'>
                <h2 className='h2'>הודעות</h2>
                <div>
                {data.length=== 0 ? <p>אין הודעות חדשות..</p> : null}
                    {data.map((item) => ( // הרצת לולאה על המערך
                        <div key={item.id} className='message' >
                            <li>{item.timestamp} | {item.content}</li> 
                            {user?.isAdmin === false ? null : (
                                <div className='admin-buttons'>
                                    <button className='admin-button admin-edit-button' onClick={() => handleEdit(item._id)}>
                                        <img src="/images/edit-icon.png" alt="edit-icon" />
                                    </button>
                                    <button className='admin-button admin-delete-button' onClick={() => handleDelete(item._id)}>
                                        <img src="/images/trash-icon.png" alt="trash-icon" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                    {user?.isAdmin === false ? null : (
                        <button className='plus-button' onClick={() => setEditBox(!editBox)}>
                                <img src="/images/plus-icon.png" alt="plus-icon" />
                        </button>
                    )}
            </div>
            
            {!editBox ? null :
                <div className='new-message-box'>
                    <form action="" onSubmit={addNewMessage}>
                        <label>הוספת הודעה חדשה</label>
                        <input type="text" onChange={handleChange} placeholder='כתוב כאן הודעה'/>
                        <div className='new-message-box-buttons'>
                            <button>הוסף הודעה</button>
                            <button onClick={ ()=> setEditBox(false)}>בטל</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default Notes;
