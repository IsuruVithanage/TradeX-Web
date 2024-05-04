import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseConfig from "./firebaseConfig.json";
import alertOperations from "./alertOperations";


class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.messaging = getMessaging(app);
        this.getToken();
        
        this.onMessage((payload) => {
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: payload.notification.icon,
                badge: 'https://raw.githubusercontent.com/IsuruVithanage/TradeX-Web/dev/src/Assets/Images/TradeX-mini-logo.png'
            });
        });
    }


    async requestPermission() {
        let permission = Notification.permission;

        return new Promise(async(resolve, reject) => {
            if (permission === "granted") {
                resolve(true);
            }

            else if (permission === "denied") {
                alert("Please allow notifications in your browser settings");
                resolve(false);
            }

            else{
                while (permission === "default") {
                    alert("Please allow notifications in your browser settings");
                    permission = await Notification.requestPermission();

                    if (permission === "granted") {
                        resolve(true);
                    } else if (permission === "denied") {
                        alert("Please allow notifications in your browser settings");
                        resolve(false);
                    }
                }
            }
        });
    }



    async getToken() {
        return new Promise(async(resolve, reject) => {
            await this.requestPermission();

            getToken(this.messaging, {
                vapidKey: firebaseConfig.vapidKey,
            })
            .then((deviceToken) => {
                this.deviceToken = deviceToken;
                alertOperations.saveDeviceToken(1, deviceToken);
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
