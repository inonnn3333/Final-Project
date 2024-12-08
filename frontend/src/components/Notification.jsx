import React, { createContext, useContext, useState } from 'react';
import '../styles/notification.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'success') => {
        const id = new Date().getTime();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeNotification(id), 3000); // הסרה אוטומטית אחרי 3 שניות
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`notification ${notification.type}`}
                        onClick={() => removeNotification(notification.id)}
                    >
                        {notification.message}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
