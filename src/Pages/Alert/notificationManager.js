import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { saveDeviceToken } from "./alertServices";
import { getUser } from "../../Storage/SecureLs";



class NotificationManager {
    constructor() {
        isSupported().then((isSupported) => {
            const firebaseConfig = {
                apiKey: process.env.REACT_APP_FCM_API_KEY,
                authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
                projectId: process.env.REACT_APP_FCM_PROJECT_ID,
                storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
                messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
                appId: process.env.REACT_APP_FCM_APP_ID,
            };

           
            if (isSupported) {
                this.isRequestingPermission = false;
                this.deviceToken = null;
                this.setIsRegistered = null;
                this.appNotificationsSetter = () => {};
                this.onPushNotificationFunction = () => {};
                this.onAppNotificationFunction = () => {};
                const app = initializeApp(firebaseConfig);
                this.messaging = getMessaging(app);
                this.registerServiceWorker();
                this.getToken();
                this.connectWebSocket();

                onMessage(this.messaging, (payload) => this.runOnMessageFunctions(payload));
            }
        });  
    }


    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then(() => {
                navigator.serviceWorker.addEventListener('message', (e) => {
                    if (e.data && e.data.msg === 'onBackground') {
                        this.runOnMessageFunctions(e.data);
                    }
                });
            })
            .catch(() => {
                console.log('Service Worker registration failed');
            });
        } else {
            console.log('Service Workers are not supported by this browser');
        }
    }


    async requestPermission() {
        if(this.isRequestingPermission){
            return false;
        }

        this.isRequestingPermission = true;
        let permission = Notification.permission;

        return new Promise(async (resolve) => {
            if (permission === "granted") {
                resolve(true);
                this.isRequestingPermission = false;
            }

            else if (permission === "denied") {
                resolve(false);
                this.isRequestingPermission = false;
            }

            else{
                let isFistTime = (permission === "default");

                while (permission === "default") {
                    permission = await Notification.requestPermission();

                    if(isFistTime && permission === "default"){
                        alert("Please allow to receive Notifications from TradeX.");
                        isFistTime = false;
                    }

                    if (permission === "granted") {
                        resolve(true);
                        this.isRequestingPermission = false;
                    } 
                    
                    else if (permission === "denied") {
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
        const permission = await this.requestPermission();


        if(!userId || !await isSupported() || this.deviceToken !== null || !permission){
            return;
        }


        getToken(this.messaging, {
            vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
            serviceWorkerRegistration: await navigator.serviceWorker.ready,
        })

        .then((deviceToken) => {
            this.deviceToken = deviceToken;
            console.log("device Token", deviceToken);
            saveDeviceToken(userId, deviceToken);

            if(this.setIsRegistered){
                this.setIsRegistered(!deviceToken ? false : true);
            }
        })

        .catch(() => {
            console.log("error getting device Token");
            if(this.setIsRegistered){
                this.setIsRegistered(false);
            }
        });
    }


    setAppNotificationsSetter(functionToExecute) {
        this.appNotificationsSetter = functionToExecute;
    };


    onAppNotification(functionToExecute) {
        this.onAppNotificationFunction = functionToExecute;
    }


    onPushNotification(functionToExecute) {
        this.onPushNotificationFunction = functionToExecute;
    }


    async runOnMessageFunctions({notification, data}) {
        if(notification){
            if(notification.title){
                new Notification(notification.title, {
                    body: notification.body,
                    icon: notification.icon,
                });
            }
            
            if(typeof this.onPushNotificationFunction === 'function'){
                this.onPushNotificationFunction(notification);
            }
        }

        if(data){
            this.appNotificationsSetter();
            if(typeof this.onAppNotificationFunction === 'function'){
                this.onAppNotificationFunction(data);
            }
        }
    }



    updateRegister(setIsRegistered) { 
        this.setIsRegistered = setIsRegistered;
        !this.deviceToken ? 
        this.setIsRegistered(false) : 
        this.setIsRegistered(true);
    }


    async connectWebSocket() {
        const user = getUser();
        const userId = user && user.id;

        if(!userId){
            return;
        }

        const ws = new WebSocket('ws://localhost:8002?userId=' + userId);

        ws.onmessage = (event) => {
            const payload = JSON.parse(event.data);
            this.runOnMessageFunctions(payload);
        };

        ws.onclose = () => {
            setTimeout(() => {
                console.log("Notification Service connection failed. trying to reconnect");
                this.connectWebSocket();
            }, 15000);
        };
    }


}

const notificationManager = new NotificationManager();
export default notificationManager;
