import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { showMessage } from "../../Components/Message/Message";
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from '../../Components/Input/Input';
import Table, { TableRow, Coin } from '../../Components/Table/Table';
import Modal from '../../Components/Modal/Modal';
import alertOperations from "./alertOperations";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import './Alert.css';



export default function Alert({firebase}) {
    const [selectedPage, setSelectedPage] = useState("Running");
    const [alerts, setAlerts] = useState([]);
    const [currentAlert, setCurrentAlert] = useState({});
    const [addOrEditAlert, setAddOrEditAlert] = useState(false);
    const [deleteOrClearAlert, setDeleteOrClearAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isInvalid, setIsInvalid] = useState([true, null]);
    const selectedPageRef = useRef(selectedPage);
    const userId = useSelector(state => state.user.user.id);

    
    useEffect(() => {
        firebase.updateRegister(setIsRegistered);
        firebase.requestPermission()
        .then((isAllowed) => {
            if(!isAllowed){
                showMessage('warning', "Please allow notifications in your browser settings to use this feature.", 3);
            }
        });
    }, [firebase]);

    
    
    useEffect(() => {  
        selectedPageRef.current = selectedPage;

        if(!isRegistered) {
            setIsLoading(false);
            setAlerts([]);
            return;
        }


        const getAlerts = async () => {
            setIsLoading(true);
            setAlerts([]);

            alertOperations
            .getAlerts(userId, selectedPageRef.current === "Running")
            .then((res) => {
                res && setAlerts(res);
                setIsLoading(false)
            });
        }

        firebase.onMessage(() => {
            getAlerts();
        });

        getAlerts();

    }, [selectedPage, isRegistered, firebase, userId]);


    useEffect(() => {
        let invalidMessage = null;
        let similarAlertPosition = 0;
        const { alertId, coin, condition, price, emailActiveStatus } = currentAlert;

        if (coin && condition && price) {
            setIsInvalid([false, null]);

            for (const alert of alerts) {
                similarAlertPosition += 1;
    
                if( alert.coin === coin && alert.condition === condition ){
                    if (alertId !== alert.alertId){ 
                        invalidMessage = `This alert already exists at ${similarAlertPosition}`;
                    }
                    
                    else if(alert.price === price && alert.emailActiveStatus === emailActiveStatus){
                        invalidMessage = "No Changes Made"; ;
                    }
                    break;
                }
            }
        }
        
        else{
            invalidMessage = "Please fill all the fields"
        }

        if ( invalidMessage ){
            setIsInvalid([true, invalidMessage]);
        }

    }, [currentAlert, alerts]);

    


    const call = async  (func, restoreAlertId) => {
        setIsLoading(true);
        let args = [];
        let modalSetter = null;
        const { alertId, coin, condition, price, emailActiveStatus } = currentAlert;
        const { addAlert, editAlert, restoreAlert, deleteAlert, clearAll } = alertOperations;

        switch (func) {
            case 'Add':
                func = addAlert;
                args = [coin, price, condition, emailActiveStatus];
                modalSetter = setAddOrEditAlert;
                break;
            case 'Edit':
                func = editAlert;
                args = [alertId, coin, price, condition, emailActiveStatus];
                modalSetter = setAddOrEditAlert;
                break;
            case 'restoreAlert':
                func = restoreAlert;
                args = [restoreAlertId];
                break;
            case 'deleteAlert':
                func = deleteAlert;
                args = [alertId, selectedPage === "Running"];
                modalSetter = setDeleteOrClearAlert;
                break;
            case 'clearAll':
                func = clearAll;
                modalSetter = setDeleteOrClearAlert;
                break;
            default:
                break;
        }

        await func(userId, ...args)
        .then(res => res && setAlerts(res));

        modalSetter && modalSetter(false);
        setIsLoading(false);
    };
    

    const addAlert = async () => {
        if(!isRegistered && !await firebase.requestPermission()){
            showMessage('warning', "Please allow notifications in your browser settings to use this feature.", 3);
            return;
        }
        setCurrentAlert({emailActiveStatus: false}); 
        setAddOrEditAlert('Add');
    }

    const setAlertId = (alertId) => {
        setCurrentAlert({alertId: alertId});
    }

    const setCoin = (coin) => {
        setCurrentAlert(prev => ({...prev, coin: coin}));
    }

    const setCondition = (condition) => {
        setCurrentAlert(prev => ({...prev, condition: condition}));
    }

    const setPrice = (price) => {
        setCurrentAlert(prev => ({...prev, price: price}));
    }

    const setEmail = (email) => {
        setCurrentAlert(prev => ({...prev, emailActiveStatus: email}));
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
                    { label:"Running", value:"Running"},
                    { label:"Notified", value:"Notified"},
                ],
            }}>  


            <Table 
                restart={alerts} 
                emptyMessage={!isRegistered ? "Allow Notifications to show alerts" : "No alerts to show"}
                tableTop= {
                    <div style={{display: "flex", alignItems: "center", position: "relative"}}>
                        <h2 style={{color: "#21DB9A", fontSize: "24px", width: "100%", textAlign: "center"}}>{selectedPage + " Alerts"}</h2>
                        <div style={{width: "130px", marginLeft: "auto", margin: "8px 0"}}>
                            <Input 
                                type='button' 
                                value={selectedPage === 'Running' ? 'Add Alert' : 'Clear All'} 
                                red={selectedPage === 'Notified'}
                                onClick={() => selectedPage === 'Running' ?  addAlert() : setDeleteOrClearAlert('clearAll')}
                                disabled={selectedPage === 'Notified' && alerts.length === 0}
                                />
                        </div>
                    </div>
                }>
                    
                <TableRow data={['Coin', 'Price Threshold', 'Condition', 'Email Notifications', 'Actions']} />

                { alerts.map((alert, index) => {
                    return (
                        <TableRow 
                            key={index} 
                            data={[
                                <Coin>{alert.coin}</Coin>, 
                                '$ ' + alert.price.toLocaleString(),
                                alert.condition, 
                                (alert.emailActiveStatus) ? "On" : "Off", 
                                <div className="alert-table-action-button-container">
                                    { selectedPage === "Running" ?
                                    <Input type="button" value="Edit" style={{width:"90px"}} onClick={() => {setAddOrEditAlert('Edit'); setCurrentAlert(alert)}} outlined/>  :
                                    <Input type="button" value="Restore" style={{width:"90px"}} onClick={() => call('restoreAlert', alert.alertId)} outlined/>
                                    }
                                    <Input type="button" value="Delete" style={{width:"90px"}} onClick={() => { setDeleteOrClearAlert('deleteAlert'); setAlertId(alert.alertId)}} outlined red/>
                                </div>
                            ]}
                        />
                    )
                })}
            </Table>
                
        </BasicPage>
    



                
        <Modal open={addOrEditAlert} close={setAddOrEditAlert}>
            <div style={{width:"400px", WebkitUserSelect: "none", userSelect: "none"}}>
                <div style={{width:"300px", margin:"auto", marginBottom:"25px"}}>
                    <h1 style={{textAlign:"center"}}>{`${ addOrEditAlert } Alert`}</h1>
                    <Input type="dropdown" label='Coin' options={options} value={currentAlert.coin} onChange={setCoin}/>
                    <Input type="dropdown" label='Condition' value={currentAlert.condition} onChange={setCondition} searchable={false} options={[
                        { value: 'Equals', label: 'Equals' },
                        { value: 'Above', label: 'Above' },
                        { value: 'Below', label: 'Below' },
                    ]}/>
                    <Input type="number" label='Price' value={currentAlert.price} min={0} onChange={setPrice}/>

                    <Input type="toggle" toggleLabel="Email Notification"  checked={currentAlert.emailActiveStatus || false} onChange={setEmail}/>
                    
                    <div className="edit-alert-modal-button-container">
                        <Input type="button" style={{width:"110px"}} disabled={isInvalid[0]} onClick={ () => call(addOrEditAlert)} value={ addOrEditAlert }/>
                        <Input type="button" style={{width:"110px"}} onClick={() => setAddOrEditAlert(false)} value="Cancel" red/>
                    </div>  

                    <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > { isInvalid[1] } </p>        
                </div>
            </div>
        </Modal>



        <Modal open={deleteOrClearAlert} close={setDeleteOrClearAlert}>
            <div style={{width:"350px"}}>
                <div style={{width:"300px", margin:"0 auto 30px auto"}}>
                    <h1 style={{textAlign:"center"}}>{deleteOrClearAlert === 'clearAll' ? 'Clear All Alerts' : 'Delete the Alert'}</h1>
                    <p style={{textAlign:"center", marginTop: "10px", color: "#9e9e9e"}}>{deleteOrClearAlert === 'clearAll' ? 'Are you sure you want to clear all alerts?' : 'Are you sure you want to delete the alert?'}</p>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>{
                        deleteOrClearAlert === 'clearAll' ? 
                        <DeleteSweepIcon style={{color: '#49494980', fontSize: '80px'}}/> : 
                        <DeleteIcon style={{color: '#49494980', fontSize: '70px'}}/>
                    }</div>
                    <div className="edit-alert-modal-button-container" style={{width: '250px', marginTop: '30px'}}>
                        <Input type="button" style={{width:"110px"}} onClick={() => call(deleteOrClearAlert)} value={deleteOrClearAlert === 'clearAll' ? 'Clear All' : 'Delete'} red/>
                        <Input type="button" style={{width:"110px"}} onClick={() => setDeleteOrClearAlert(false)} value="Cancel"/>
                    </div> 
                </div>
            </div>
        </Modal>

    </> )
}