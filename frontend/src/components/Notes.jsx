import React, { useState } from 'react';
import '../styles/notes.css';

const Notes = () => {
    const [data, setData] = useState("שלום לכולם אתם תותחים ואני לא  כחנכג ינחגכ חדגכ חךדג כיה אני יכול לעשות");

    return (
        <div>
            <div className='message-box'>
                <div>
                    {data}
                </div>
                <div className='NISAION'>
                    <button className='edit-button'>
                            <span className="tooltip">הודעה חדשה</span>
                            <img src="/images/edit-icon.png" alt="edit-icon" />
                    </button>
                </div>
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
