import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { saveDeviceToken } from "./alertServices";
import {getUser} from "../../Storage/SecureLs";


class Firebase {
    constructor() {
        isSupported().then((isSupported) => {
            if (isSupported) {
                const firebaseConfig = {
                    apiKey: process.env.REACT_APP_FCM_API_KEY,
                    authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
                    projectId: process.env.REACT_APP_FCM_PROJECT_ID,
                    storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
                    messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
                    appId: process.env.REACT_APP_FCM_APP_ID,
                };
           
                const app = initializeApp(firebaseConfig);
                this.isRequestingPermission = false;
                this.messaging = getMessaging(app);
                this.registerServiceWorker();
                this.getToken();

                this.onMessage();
            }
        });  
    }


    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .catch(() => { console.log('Service Worker registration failed');});
        } else {
            console.warn('Service Workers are not supported by this browser');
        }
    }


    async requestPermission() {
        if(this.isRequestingPermission){
            return false;
        }

        this.isRequestingPermission = true;
        let permission = Notification.permission;

        return new Promise(async (resolve, reject) => {
            if (permission === "granted") {
                resolve(true);
                this.isRequestingPermission = false;
            }

            else if (permission === "denied") {
                resolve(false);
                this.isRequestingPermission = false;
            }

            else{
                let isFistTime = permission === "default";

                while (permission === "default") {
                    permission = await Notification.requestPermission();

                    if(isFistTime && permission === "default"){
                        alert("Please allow to receive Notifications from TradeX.");
                        isFistTime = false;
                    }

                    if (permission === "granted") {
                        resolve(true);
                        this.isRequestingPermission = false;
                    } else if (permission === "denied") {
                        alert("Notifications Blocked! enable it in your browser settings To receive notifications from TradeX.");
                        resolve(false);
                        this.isRequestingPermission = false;
                    }
                }
            }
        });
    }



    async getToken() {
        const user = getUser();
        const userId = user && user.id;


        if(!userId || !await isSupported()){
            return;
        }


        this.requestPermission().then(async() => {

            getToken(this.messaging, {
                vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
                serviceWorkerRegistration: await navigator.serviceWorker.ready,
            })

            .then((deviceToken) => {
                this.deviceToken = deviceToken;
                saveDeviceToken(userId, deviceToken);

                if(this.setIsRegistered){
                    this.setIsRegistered(!deviceToken ? false : true);
                }
            })

            .catch((error) => {
                console.log("error getting device Token", error);
                if(this.setIsRegistered){
                    this.setIsRegistered(false);
                }
            });
        });
    }



    async onMessage(functionToExecute) {
        onMessage(this.messaging, ({notification, data}) => {
            if(notification){
                new Notification(notification.title, {
                    body: notification.body,
                    icon: notification.icon,
                    badge: 'https://raw.githubusercontent.com/IsuruVithanage/TradeX-Web/dev/src/Assets/Images/TradeX-mini-logo.png'
                });
            }
            if(data){
                console.log(data);
            }

            functionToExecute({notification, data});
        });
    }


    async updateRegister(setIsRegistered) { 
        this.setIsRegistered = setIsRegistered;
        !this.deviceToken ? 
        this.setIsRegistered(false) : 
        this.setIsRegistered(true);
    }
}

export default Firebase;
