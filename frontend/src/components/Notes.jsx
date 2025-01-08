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
        setFormData({content: e.target.value, timestamp: `${moment().format('YYYY-MM-DD')}`});
    }


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
                    {data.map((item) => ( // הרצת לולאה על המערך
                        <div key={item.id} className='message'>
                            <li>{item.timestamp} | {item.content}</li>
                        </div>
                    ))}
                </div>
                    {user?.isAdmin === false ? null : (
                        <button className='edit-button' onClick={() => setEditBox(!editBox)}>
                                <img src="/images/edit-icon.png" alt="edit-icon" />
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
