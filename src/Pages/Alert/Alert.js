import React, { useState, useEffect } from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from '../../Components/Input/Input';
import Table, { TableRow } from '../../Components/Table/Table';
import Modal from '../../Components/Modal/Modal';
import axios from 'axios';
import './Alert.css';

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
    const backendApiEndpoint = "http://localhost:8081/alert/";
    const userId = 1;
    
    

    useEffect(() => {
        axios
            .get(
                backendApiEndpoint,
                {
                    params: {
                        userId: userId,
                        runningStatus: selectedPage === "Running" 
                    }
                }
            )
            
            .then(res => {
                setAlerts(res.data);
            })

            .catch(error => {
                error.response ? alert(error.message + "\n" + error.response.data.message) :
                alert(error.message + "! \nBackend server is not running or not reachable.\nPlease start the backend server and refresh the page.");
                console.log("error", error);
            });
    }, [selectedPage]);



    useEffect(() => {
        let invalidMessage = null;
        let alertCount = 0;

        if (selectedCoin && selectedCondition && selectedPrice) {
            setIsInvalid([false, null]);

            for (const alert of alerts) {
                alertCount += 1;
    
                if 
                (   
                    alert.coin === selectedCoin && 
                    alert.condition === selectedCondition && 
                    alert.price === selectedPrice
                ) 
                {
                    if (currentAlertId !== alert.alertId){ 
                        invalidMessage = `This alert already exists at ${alertCount}`;
                    }else if(alert.emailActiveStatus === selectedEmail){
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
        if (Number.isInteger(editAlertNo)) {
            const selectedAlert = alerts.filter(alert => alert.alertId === editAlertNo)[0];
            setAction("Edit");
            setCurrentAlertId(editAlertNo);
            setSelectedCoin(selectedAlert.coin);
            setSelectedPrice(selectedAlert.price);
            setSelectedCondition(selectedAlert.condition);
            setSelectedEmail(selectedAlert.emailActiveStatus);
        } 
        
        else {
            setAction("Add"); 
            setCurrentAlertId(null); 
            setSelectedCoin(undefined);
            setSelectedPrice(null);
            setSelectedCondition(undefined);
            setSelectedEmail(true);
        }

        setIsSetterModalOpen(true); 
    }



    const editAlert = () => {
        axios
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
                setAlerts(res.data);
            })

            .catch(error => {
                error.response ? alert(error.message + "\n" + error.response.data.message) :
                alert(error.message + "! \nBackend server is not running or not reachable.\nPlease start the backend server and refresh the page.");
                console.log("error", error);
            });

        setIsSetterModalOpen(false);
    }



    const addAlert = () => {
        axios
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
                setAlerts(res.data);
            })

            .catch(error => {
                error.response ? alert(error.message + "\n" + error.response.data.message) :
                alert(error.message + "! \nBackend server is not running or not reachable.\nPlease start the backend server and refresh the page.");
                console.log("error", error);
            });

        setIsSetterModalOpen(false);
    }



    const restoreAlert = (alertId) => {
        axios
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
                setAlerts(res.data);
            })

            .catch(error => {
                error.response ? alert(error.message + "\n" + error.response.data.message) :
                alert(error.message + "! \nBackend server is not running or not reachable.\nPlease start the backend server and refresh the page.");
                console.log("error", error);
            });
    }



    const deleteAlert = () => {
        axios
            .delete(
                backendApiEndpoint,
                {
                    params: {
                        alertId: currentAlertId,
                        userId: userId,
                        runningStatus: selectedPage === "Running"
                    }
                }
            )

            .then(res => {
                setAlerts(res.data);
            })

            .catch(error => {
                error.response ? alert(error.message + "\n" + error.response.data.message) :
                alert(error.message + "! \nBackend server is not running or not reachable.\nPlease start the backend server and refresh the page.");
                console.log("error", error);
            });

        setIsDeleteModalOpen(false);
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
            subPages={{
                onClick: setSelectedPage,
                pages: [
                    { label:"Running Alerts", value:"Running"},
                    { label:"Notified Alerts", value:"Notified"},
                ],
            }}>    


            { selectedPage === 'Running' && <Input type="fab" onClick={ openAlertSetterModel }/> }


            <Table emptyMessage="No alerts to show" restart={selectedPage}>
                <TableRow data={['Coin', 'Price Threshold', 'Condition', 'Email Notifications', 'Action']} />

                { alerts.map((alert, index) => {
                    return (
                        <TableRow 
                            key={index} 
                            data={[
                                [alert.coin], 
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
                    <Input type="dropdown" label='Coin' options={options} defaultValue={selectedCoin} onChange={setSelectedCoin}/>
                    <Input type="dropdown" label='Condition' defaultValue={selectedCondition} onChange={setSelectedCondition} searchable={false} options={[
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