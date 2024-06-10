import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActiveOutlined';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import './AppNotification.css';

export default function AppNotification({ user }) {
    const [isAppNotificationsVisible, setAppNotificationsVisible] = useState(false);
    const [showClearMessage, setShowClearMessage] = useState(false);
    const [badgeVisible, setBadgeVisible] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const isAppNotificationsVisibleRef = useRef(false);
    const openAppNotificationRef = useRef(null);
    const isVerified = user ? user.isVerified === "Yes" : false;


    const closeNotifications = () => {
        setAppNotificationsVisible(false);
        setShowClearMessage(false);
        if(!badgeVisible){
            setNotifications([]);
        }
    }


    const openAppNotifications = () => { 
        setAppNotificationsVisible(true);

        if(notifications.length > 0){
            setTimeout(() => {
                if(isAppNotificationsVisibleRef.current){
                    setBadgeVisible(false);
                    setShowClearMessage(true);
                }
            }, 2000);
        }
    };

    openAppNotificationRef.current = openAppNotifications;

    useEffect(() => {
        if(!isVerified){
            setNotifications([
                {
                    icon: "verify",
                    title: "Verify your Account",
                    body: "Please verify your account to get full access to the platform.",
                    onClick: '/verify'
                },
                {
                    title: "Verify your Account",
                    body: "Please verify your account to get full access to the platform. Please verify your account to get",
                },
                {
                    title: "Verify your Account",
                    body: "Please verify your account to get full access to the platform."
                },
                {
                    title: "Verify your Account",
                    body: "Please verify your account to get full access to the platform.",
                },
            ]);
        }
    }, [isVerified]);


    useEffect(() => {
        isAppNotificationsVisibleRef.current = isAppNotificationsVisible;
    }, [isAppNotificationsVisible]);


    return(
        <div onMouseEnter={openAppNotificationRef.current} onMouseLeave={closeNotifications}>
            <div className="in-app-icon-container">
                <Badge 
                    badgeContent={notifications.length} 
                    variant="dot" 
                    showZero={badgeVisible}>
                    <NotificationsIcon className="notification-icon"/>
                </Badge>
            </div>

            <div className={`app-notification-container ${isAppNotificationsVisible  ? "active" : ""}`} >
                {   notifications && notifications.length > 0 ? 
                    <div style={{overflowY: "auto", maxHeight: "310px"}}>
                        <p className="app-notification-clear-warn-message">
                            {showClearMessage ? 'Notifications will be clear after closing this' : ''}
                        </p>
                        {notifications.map((notification, index) => <AppNotificationRow key={index} {...notification}/> ) }
                    </div> :
                    <p className="app-notification-empty-message">No new Notifications</p>
                }
            </div>
        </div>
    );
}


function AppNotificationRow ({icon, title, body, onClick}){
    const navigate = useNavigate();

    icon = icon === "verify" ? 
        <VerifiedIcon size={25} style={{color: "#ffd700"}} /> : 
        <NotificationsActiveIcon size={25} />;
    

    return(
        <div 
            className='app-notification-item' 
            onClick={() => navigate(onClick)} 
            style={{cursor: !onClick ? 'default' : 'pointer'}}>

            <div className='app-notification-icon'>{icon}</div>
            <div className='app-notification-content'>
                <div className='app-notification-title'>{title}</div>
                <div className='app-notification-body'>{body}</div>
            </div>
        </div>
    );
}
