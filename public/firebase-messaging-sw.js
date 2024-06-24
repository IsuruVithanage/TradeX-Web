importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
    "apiKey": "AIzaSyBJv9b-8DVdlt3vqwXkt5fXL2BxeWBCqME",
    "authDomain": "tradex-notification-service.firebaseapp.com",
    "projectId": "tradex-notification-service",
    "storageBucket": "tradex-notification-service.appspot.com",
    "messagingSenderId": "639115028530",
    "appId": "1:639115028530:web:6ede4c2555cdda57a1f42b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    if (payload.notification) {
        payload.notification.title = null;
    };


    clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                msg: 'onBackground',
                data: payload.data,
                notification: payload.notification,
            });
        });
    });
});