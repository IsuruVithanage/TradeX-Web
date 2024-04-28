import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import alertOperations from "./alertOperations";
import firebaseConfig from "./firebaseConfig.json";

const getFcmDeviceToken = async (userId) => {
    return new Promise((resolve, reject) => {
        try{
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);

            getToken(messaging, {
                vapidKey: firebaseConfig.vapidKey,
            })
            
            .then((deviceToken) => {
                alertOperations.saveDeviceToken(userId, deviceToken)
                resolve({
                    messaging: messaging,
                    registered: !deviceToken ? false : true,
                });
            })
            
            .catch(() => {
                resolve({
                    messaging: messaging,
                    registered: false
                });
            }); 
        }
        
        catch (error) {
            console.log('Error in getting device token:', error);
            resolve({
                messaging: {},
                registered: false
            });
        }

    });
}

export default getFcmDeviceToken;