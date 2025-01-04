import React, { useState } from 'react';

const Notes = () => {
    const [data, setData] = useState();

    return (
        <div>
            <p>
                {data}
            </p>

            <form action="">
                <p>הודעה חדשה</p>
                <input type="text" />
                <button>הוסף הודעה</button>
            </form>
        </div>
    )
}

export default Notes;
