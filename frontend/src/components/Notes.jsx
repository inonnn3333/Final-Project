import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/notes.css';

const Notes = () => {
    const [data, setData] = useState([]);
    const [editBox, setEditBox] = useState(false);

    useEffect(() => {     
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1010/messages');
                // const responseData = JSON.stringify(response.data);
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
                <div>
                    {data.map((item) => ( // הרצת לולאה על המערך
                        <div key={item.id} className='message'>
                            <li>{item.content}</li>
                        </div>
                    ))}
                </div>
                    <button className='edit-button'>
                            <img src="/images/edit-icon.png" alt="edit-icon" />
                    </button>
                </div>

            <form action="">
                <p>הודעה חדשה</p>
                <input type="text" />
                <button>הוסף הודעה</button>
            </form>
        </div>
    )
}

export default Notes;
