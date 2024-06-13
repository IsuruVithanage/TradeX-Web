import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationManager from '../../Pages/Alert/notificationManager';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import NotificationsActiveOutlined from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import './AppNotification.css';


export default function AppNotification({ user }) {
    const [isAppNotificationsVisible, setAppNotificationsVisible] = useState(false);
    const [badgeVisible, setBadgeVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const isVerified = user ? user.isVerified === "Yes" : false;
    const userId = user && user.id;

    
    const verifyAccountNotification = {
        icon: "verify",
        title: "Verify your Account",
        body: "Please verify your account to get full access to the platform.",
        onClick: 'http://localhost:3000/verify'
    };



    useEffect(() => {
        if(badgeVisible && isAppNotificationsVisible){
            setTimeout(() => {
                if (isAppNotificationsVisible) {

                    const viewedNotificationIds = notifications
                        .map(notification => !notification.isViewed ? notification.notificationId : null)
                        .filter(notificationId => notificationId !== null);

                    if (viewedNotificationIds.length === 0) return;

                    axios.post('http://localhost:8002/notification/markAsViewed', { 
                        userId, notificationIds: viewedNotificationIds 
                    })

                    .then((res) => {
                        setNotifications(res.data.notifications);
                        setBadgeVisible(res.data.isNew);
                    })

                    .catch(() => {
                        console.log("Notifications mark as viewed failed");
                    });
                }
            }, 2000);
        }
    }, [badgeVisible, isAppNotificationsVisible, notifications, userId]);




    useEffect(() => {
        const getNotifications = async () => {
            axios.get('http://localhost:8002/notification/getAll', {
                params: { userId: userId }
            })
            
            .then(res => {
                setNotifications(res.data.notifications);
                setBadgeVisible(res.data.isNew);
            })

            .catch(() => {
                console.log("App Notifications getting failed");
            });
        }

        getNotifications();


        notificationManager.onAppNotification(() => {
            getNotifications();
        });
    }, [userId]);



    return (
        <div 
            onMouseEnter={() => setAppNotificationsVisible(true)} 
            onMouseLeave={() => setAppNotificationsVisible(false)} >
            <div className="notification-icon-container">
                <Badge
                    badgeContent={0}
                    variant="dot"
                    showZero={badgeVisible}>
                    <NotificationsIcon className="notification-icon" />
                </Badge>
            </div>

            <div className={`app-notification-container ${isAppNotificationsVisible ? "active" : ""}`} >
                {(notifications && notifications.length > 0) || !isVerified ?
                    <div style={{ overflowY: "auto", maxHeight: "348px" }}>
                        {!isVerified && <AppNotificationRow {...verifyAccountNotification} />}
                        {notifications.map((notification, index) => <AppNotificationRow key={index} {...notification} />)}
                    </div> :
                    <p className="app-notification-empty-message">No new Notifications</p>
                }
            </div>
        </div>
    );
}

function AppNotificationRow({ icon, title, body, onClick, isViewed, sentAt }) {
    const navigate = useNavigate();
    onClick = !onClick ? null : onClick.slice(21);
    sentAt = !sentAt ? null : new Date(sentAt).toLocaleTimeString('en-us', { timeStyle: 'short', hour12: true});
    icon =  
        icon === "verify" ? <VerifiedIcon size={25} style={{ color: "#ffd700" }} /> : 
        isViewed ? <NotificationsActiveOutlined size={25} /> : <NotificationsActive size={25} />;

    return (
        <div
            className='app-notification-item'
            onClick={() => navigate(onClick)}
            style={{ cursor: !onClick ? 'default' : 'pointer' }}>

            <div className='app-notification-icon'>{icon}</div>
            <div className='app-notification-content'>
                <div className='app-notification-time'>{sentAt}</div>
                <div className='app-notification-title'>{title}</div>
                <div className='app-notification-body'>{body}</div>
            </div>
        </div>
    );
}
