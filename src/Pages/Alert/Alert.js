import React, { useState, useEffect, useRef } from "react";
import { onMessage } from "firebase/messaging";
import getFcmDeviceToken from "./getFcmDeviceToken";
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from '../../Components/Input/Input';
import Table, { TableRow, Coin } from '../../Components/Table/Table';
import Modal from '../../Components/Modal/Modal';
import alertOperations from "./alertOperations";
import './Alert.css';

const userId = 1;
let fcm = await getFcmDeviceToken(userId);



export default function Alert() {
    const [selectedPage, setSelectedPage] = useState("Running");
    const [selectedCoin, setSelectedCoin] = useState(undefined);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(undefined); 
    const [selectedEmail, setSelectedEmail] = useState(false);
    
    const [currentAlertId, setCurrentAlertId] = useState(null);
    const [action, setAction] = useState(undefined);
    const [isInvalid, setIsInvalid] = useState([true, null]);
    const [alerts, setAlerts] = useState([]);

    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(fcm.registered);
    const selectedPageRef = useRef(selectedPage);
   

    useEffect(() => {
        if(!isRegistered){
            Notification.requestPermission(async(value) => {
                if(value === 'granted'){
                    fcm = await getFcmDeviceToken(userId);
                    setIsRegistered(fcm.registered)
                }
                else{
                    alert('Please Allow Notifications in your browser settings to use this feature..!');
                    setIsRegistered(fcm.registered)
                    Notification.requestPermission(async() => {
                        fcm = await getFcmDeviceToken(userId);
                        setIsRegistered(fcm.registered)
                    });
                }
            });
        }
    },[isRegistered]);


    

    useEffect(() => {  
        selectedPageRef.current = selectedPage;

        if(!isRegistered) {
            setIsLoading(false);
            setAlerts([]);
            return;
        }

        onMessage(fcm.messaging, (payload) => {
            console.log("Message handled in the foreground!");
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: payload.notification.icon,
                image: payload.notification.image,
            });
            
            getAlerts();

        });
        getAlerts();

    }, [selectedPage, isRegistered]);



    useEffect(() => {
        let invalidMessage = null;
        let similarAlertPosition = 0;

        if (selectedCoin && selectedCondition && selectedPrice) {
            setIsInvalid([false, null]);

            for (const alert of alerts) {
                similarAlertPosition += 1;
    
                if( alert.coin === selectedCoin && alert.condition === selectedCondition ){
                    if (currentAlertId !== alert.alertId){ 
                        invalidMessage = `This alert already exists at ${similarAlertPosition}`;
                    }
                    
                    else if(alert.emailActiveStatus === selectedEmail && alert.price === selectedPrice){
                        invalidMessage = "No Changes Made"; ;
                    }
                    break;
                }
            }
        }
        
        else{
            setIsInvalid([true, "Please fill all the fields"]);
            invalidMessage = "Please fill all the fields"
        }

        if ( invalidMessage ){
            setIsInvalid([true, invalidMessage]);
        }

    }, [selectedCoin, selectedCondition, selectedPrice, selectedEmail, currentAlertId, alerts]);



    const openAlertSetterModel = (editAlertNo) => {
        if(Notification.permission !== 'granted') {
            Notification.requestPermission(async(value) => {
                if(value === 'granted'){
                    fcm = await getFcmDeviceToken(userId);
                    setIsRegistered(fcm.registered)
                    openAlertSetterModel(editAlertNo);
                }
                else{
                    alert('Please Allow Notifications in your browser settings to use this feature..!');
                    Notification.requestPermission(async() => {
                        fcm = await getFcmDeviceToken(userId);
                        setIsRegistered(fcm.registered)
                    });
                }
            });
        }

        else{
            if (!editAlertNo) {
                setAction("Add"); 
                setCurrentAlertId(null); 
                setSelectedCoin(undefined);
                setSelectedPrice(null);
                setSelectedCondition(undefined);
                setSelectedEmail(true);
            } 
            
            else {
                const selectedAlert = alerts.find(alert => alert.alertId === editAlertNo);
                setAction("Edit");
                setCurrentAlertId(editAlertNo);
                setSelectedCoin(selectedAlert.coin);
                setSelectedPrice(selectedAlert.price);
                setSelectedCondition(selectedAlert.condition);
                setSelectedEmail(selectedAlert.emailActiveStatus);
            }

            setIsSetterModalOpen(true); 
        }  
    }



    const getAlerts = () => {
        setIsLoading(true);
        setAlerts([]);
        
        alertOperations.getAlerts(userId, selectedPageRef.current === "Running")
        .then(res => res && setAlerts(res));

        setIsLoading(false);
    }


    
    const editAlert = async () => {
        setIsLoading(true);

        await alertOperations.editAlert(userId, currentAlertId, selectedCoin, selectedCondition)
        .then(res => res && setAlerts(res));

        setIsSetterModalOpen(false);
        setIsLoading(false);
    }



    const addAlert = async () => {
        setIsLoading(true);

        await alertOperations.addAlert(userId, selectedCoin, selectedCondition)
        .then(res => res && setAlerts(res));

        setIsSetterModalOpen(false);
        setIsLoading(false);
    }



    const restoreAlert = async (alertId) => {
        setIsLoading(true);

        await alertOperations.restoreAlert(userId, alertId)
        .then(res => res && setAlerts(res));

        setIsLoading(false);
    }



    const deleteAlert = async () => {
        setIsLoading(true);

        await alertOperations.deleteAlert(userId, currentAlertId, selectedPage === "Running")
        .then(res => res && setAlerts(res));

        setIsDeleteModalOpen(false);
        setIsLoading(false);
    }



    const options = [
      { value: 'BTC', label: 'BTC' },
      { value: 'ETH', label: 'ETH' },
      { value: 'DOGE', label: 'DOGE' },
      { value: 'ADA', label: 'ADA' },
      { value: 'BNB', label: 'BNB' },
      { value: 'XRP', label: 'XRP' },
    ];




    return (
    <>
        <BasicPage
            isLoading={isLoading}
            subPages={{
                onClick: setSelectedPage,
                pages: [
                    { label:"Running Alerts", value:"Running"},
                    { label:"Notified Alerts", value:"Notified"},
                ],
            }}>  

            { selectedPage === 'Running' && <Input type="fab" onClick={() => openAlertSetterModel() }/> }


            <Table 
                restart={alerts} 
                emptyMessage={!isRegistered ? "Allow Notifications to show alerts" : "No alerts to show"}>
                    
                <TableRow data={['Coin', 'Price Threshold', 'Condition', 'Email Notifications', 'Action']} />

                { alerts.map((alert, index) => {
                    return (
                        <TableRow 
                            key={index} 
                            data={[
                                <Coin>{alert.coin}</Coin>, 
                                alert.price, 
                                alert.condition, 
                                (alert.emailActiveStatus) ? "On" : "Off", 
                                <div className="alert-table-action-button-container">
                                    { selectedPage === "Running" ?
                                    <Input type="button" value="Edit" style={{width:"90px"}} onClick={() => openAlertSetterModel(alert.alertId)} outlined/>  :
                                    <Input type="button" value="Restore" style={{width:"90px"}} onClick={() => restoreAlert(alert.alertId)} outlined/>
                                    }
                                    <Input type="button" value="Delete" style={{width:"90px"}} onClick={() => { setIsDeleteModalOpen(true); setCurrentAlertId(alert.alertId)}} outlined red/>
                                </div>
                            ]}
                        />
                    )
                })}
            </Table>
                
        </BasicPage>
    



                
        <Modal open={isSetterModalOpen} close={setIsSetterModalOpen}>
            <div style={{width:"450px", WebkitUserSelect: "none", userSelect: "none"}}>
                <div style={{width:"300px", margin:"auto", marginBottom:"25px"}}>
                    <h1 style={{textAlign:"center"}}>{`${ action } Alert`}</h1>
                    <Input type="dropdown" label='Coin' options={options} value={selectedCoin} onChange={setSelectedCoin}/>
                    <Input type="dropdown" label='Condition' value={selectedCondition} onChange={setSelectedCondition} searchable={false} options={[
                        { value: 'Equals', label: 'Equals' },
                        { value: 'Above', label: 'Above' },
                        { value: 'Below', label: 'Below' },
                    ]}/>
                    <Input type="number" label='Price' id="edit-alert-price" value={selectedPrice} onChange={setSelectedPrice}/>

                    <Input type="toggle" id='edit-alert-email' toggleLabel="Email Notification"  checked={selectedEmail} onChange={setSelectedEmail}/>
                    
                    <div className="edit-alert-modal-button-container">
                        <Input type="button" style={{width:"110px"}} disabled={isInvalid[0]} onClick={ action === 'Edit' ? editAlert : addAlert} value={ action }/>
                        <Input type="button" style={{width:"110px"}} onClick={() => setIsSetterModalOpen(false)} value="Cancel" red/>
                    </div>  

                    <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > { isInvalid[1] } </p>        
                </div>
            </div>
        </Modal>



        <Modal open={isDeleteModalOpen} close={setIsDeleteModalOpen}>
            <div style={{width:"450px"}}>
                <div style={{width:"300px", margin:"auto", marginBottom:"50px"}}>
                    <h1 style={{textAlign:"center"}}>Confirm Alert Delete</h1>
                    <div className="edit-alert-modal-button-container">
                        <Input type="button" style={{width:"110px"}} onClick={ deleteAlert } value="Delete" red/>
                        <Input type="button" style={{width:"110px"}} onClick={() => setIsDeleteModalOpen(false)} value="Cancel"/>
                    </div> 
                </div>
            </div>
        </Modal>

    </> )
}