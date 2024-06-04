import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import alertOperations from "./alertOperations";


class Firebase {
    constructor(userId) {
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
                this.getToken();
                this.userId = userId;

                this.onMessage((payload) => {
                    new Notification(payload.notification.title, {
                        body: payload.notification.body,
                        icon: payload.notification.icon,
                    });
                });
            }
        });  
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
        return new Promise(async(resolve, reject) => {
            await this.requestPermission(false);

            getToken(this.messaging, {
                vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
            })
            .then((deviceToken) => {
                this.deviceToken = deviceToken;
                alertOperations.saveDeviceToken(this.userId, deviceToken);
                if(this.setIsRegistered){
                    this.setIsRegistered(!deviceToken ? false : true);
                }
                resolve();
            })
            .catch(() => {
                if(this.setIsRegistered){
                    this.setIsRegistered(false);
                }
                resolve();
            });
        });
    }



    async onMessage(functionToExecute) {
        onMessage(this.messaging, (payload) => {
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: payload.notification.icon,
                badge: 'https://raw.githubusercontent.com/IsuruVithanage/TradeX-Web/dev/src/Assets/Images/TradeX-mini-logo.png'
            });

            functionToExecute(payload);
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
