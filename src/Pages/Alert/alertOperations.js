import axios from 'axios';
import { showMessage } from '../../Components/Message/Message';

const backendApiEndpoint = "http://localhost:8003/alert/";



const getAlerts = async (userId, runningStatus) => {
    return axios
        .get(
            backendApiEndpoint,
            {
                params: {
                    userId: userId,
                    runningStatus: runningStatus
                }
            }
        )
        
        .then(res => {
            return res.data;
        })

        .catch(error => {
            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Database connection failed..!') ;

            console.log("error", error);
        });
};





const editAlert = async (userId, currentAlertId, selectedCoin, selectedCondition) => {
    return axios
        .put(
            backendApiEndpoint,
            {
                userId: userId,
                coin: selectedCoin,
                price: parseFloat(document.getElementById("edit-alert-price").value),
                condition: selectedCondition,
                emailActiveStatus: document.getElementById("edit-alert-email").checked,
            },
            {
                params: {
                    alertId: currentAlertId,
                    runningStatus: true
                }
            }
        )

        .then(res => {
            showMessage('success', 'Alert Edit successful..!') ;
            return res.data;           
        })

        .catch(error => {
            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Alert Edit failed..!') ;

            console.log("error", error);
        });
}





const addAlert = async (userId, selectedCoin, selectedCondition) => {
    return axios
        .post( 
            backendApiEndpoint, 
            {
                userId: userId,
                coin: selectedCoin,
                price: parseFloat(document.getElementById("edit-alert-price").value),
                condition: selectedCondition,
                emailActiveStatus: document.getElementById("edit-alert-email").checked,
                runningStatus: true,
            }
        )

        .then(res => {  
            showMessage('success', 'Alert Adding successful..!') ;
            return res.data;
        })

        .catch(error => {
            console.log("error", error);

            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Alert Adding failed..!') ;
        });
}





const restoreAlert = async (userId, alertId) => {
    return axios
        .put(
            backendApiEndpoint,
            {   
                userId: userId,
                runningStatus: true
            },
            {
                params: {
                    alertId: alertId,
                    runningStatus: false
                }
            }
        )

        .then(res => {
            showMessage('success', 'Alert restore successful..!') ;
            return res.data;
        })

        .catch(error => {
            console.log("error", error);

            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Alert restore failed..!') ;
        });
}





const deleteAlert = async (userId, currentAlertId, runningStatus) => {
    return axios
        .delete(
            backendApiEndpoint,
            {
                params: {
                    alertId: currentAlertId,
                    userId: userId,
                    runningStatus: runningStatus
                }
            }
        )

        .then(res => {
            showMessage('success', 'Alert delete successful..!') ;
            return res.data;
        })

        .catch(error => {
            console.log("error", error);

            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Alert delete failed..!') ;
        });
}




const alertOperations = {
    getAlerts,
    editAlert,
    addAlert,
    restoreAlert,
    deleteAlert
};

export default alertOperations;