importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyA-qPYtv7jWQRoR-2PLGbvl_VetIdvV7g0",
    authDomain: "testnotification-12345.firebaseapp.com",
    projectId: "testnotification-12345",
    storageBucket: "testnotification-12345.appspot.com",
    messagingSenderId: "377614926314",
    appId: "1:377614926314:web:21927cbc4dbae32646b293",
    measurementId: "G-HBNF9453T1"
});

const messaging = firebase.messaging();