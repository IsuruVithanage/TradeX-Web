import React, { useState, useEffect } from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from '../../Components/Input/Input';
import Table, { TableRow } from '../../Components/Table/Table';
import Modal from '../../Components/Modal/Modal';
import './Alert.css';

 export default function Alert() {
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);

    const [selectedPage, setSelectedPage] = useState("Running");
    const [selectedCoin, setSelectedCoin] = useState(undefined);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(undefined); 
    const [selectedEmail, setSelectedEmail] = useState(false);
    
    const [currentAlertId, setCurrentAlertId] = useState(null);
    const [action, setAction] = useState(undefined);
    const [isInvalid, setIsInvalid] = useState([false, null]);
    const [alerts, setAlerts] = useState([]);


    useEffect(() => {
        setAlerts(require('./Alerts.json').filter(alert => alert.Running === (selectedPage === "Running")));
    }, [selectedPage]);

    useEffect(() => {
        let duplicateAlert = null;

        alerts.forEach((alert, index) => {
            if (selectedCoin && selectedCondition && selectedPrice) {
                setIsInvalid([false, null]);

                if (
                    currentAlertId !== index && 
                    alert.Coin === selectedCoin && 

                    alert.Condition === selectedCondition && 
                    alert.Price.toString() === selectedPrice.toString()
                ) {
                    duplicateAlert = index + 1;
                }
            }else{
                setIsInvalid([true, null]);
            }
        });

        if ( duplicateAlert ){
            setIsInvalid([true, duplicateAlert]);
        }
    }, [selectedCoin, selectedCondition, selectedPrice, currentAlertId, alerts]);


    const openAlertSetterModel = (editAlertNo) => {
        if (Number.isInteger(editAlertNo)) {
            setAction("Edit");
            setCurrentAlertId(editAlertNo);
            setSelectedCoin(alerts[editAlertNo].Coin);
            setSelectedPrice(alerts[editAlertNo].Price);
            setSelectedCondition(alerts[editAlertNo].Condition);
            setSelectedEmail(alerts[editAlertNo].Email);
        } else {
            setAction("Add");  
            setCurrentAlertId(alerts.length);
            setSelectedCoin(undefined);
            setSelectedPrice(null);
            setSelectedCondition(undefined);
            setSelectedEmail(true);
        }
        setIsSetterModalOpen(true); 
    }

    const editAlert = () => {
        alerts[currentAlertId].Coin = selectedCoin;
        alerts[currentAlertId].Condition = selectedCondition;
        alerts[currentAlertId].Price = document.getElementById("edit-alert-price").value;
        alerts[currentAlertId].Email = document.getElementById("edit-alert-email").checked;
        setIsSetterModalOpen(false);
    }

    const addAlert = () => {
        const newAlerts = [...alerts, {
            Coin: selectedCoin,
            Condition: selectedCondition,
            Price: document.getElementById("edit-alert-price").value,
            Email: document.getElementById("edit-alert-email").checked,
            Running: true,
            id: alerts.length
        }];
        setAlerts(newAlerts);
        setIsSetterModalOpen(false);
    }

    const restoreAlert = (alertNo) => {
        alerts[alertNo].Running = true;
        setAlerts(require('./Alerts.json').filter(alert => alert.Running === (selectedPage === "Running")));
    }

    const deleteAlert = () => {
        alerts[currentAlertId].Coin = null;
        alerts[currentAlertId].Condition = null;
        alerts[currentAlertId].Price = null;
        alerts[currentAlertId].Email = null;
        setIsdeleteModalOpen(false);
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
        <BasicPage
            subPages={{
                onClick: setSelectedPage,
                labels: ["Running", "Notified"],
            }}>     

                { selectedPage === 'Running' && <Input type="fab" style={{dispaly: "none"}} onClick={ openAlertSetterModel }/> }
                
                <Table id="alertTable">
                    <TableRow 
                        data={['Coin', 'Price Threshold', 'Condition', 'Email Notifications', 'Action']}
                        classes={["at-col-1", "at-col-2", "at-col-3", "at-col-4", "at-col-5"]}/>

                    { alerts.map((alert, index) => {
                        return (
                            <TableRow 
                                key={index} 
                                classes={["at-col-1", "at-col-2", "at-col-3", "at-col-4", "at-col-5"]}
                                data={[
                                    [alert.Coin], 
                                    alert.Price, 
                                    alert.Condition, 
                                    (alert.Email) ? "On" : "Off", 
                                    <div className="alert-table-action-button-container">
                                        { selectedPage === "Running" ?
                                        <Input type="button" value="Edit" style={{width:"90px"}} onClick={() => openAlertSetterModel(index)} outlined/>  :
                                        <Input type="button" value="Restore" style={{width:"90px"}} onClick={() => restoreAlert(index)} outlined/>
                                        }
                                        <Input type="button" value="Delete" style={{width:"90px"}} onClick={() => { setIsdeleteModalOpen(true); setCurrentAlertId(index)}} outlined red/>
                                    </div>
                                ]}
                            />
                        )
                    })}
                </Table>

                
                <Modal open={isSetterModalOpen} close={setIsSetterModalOpen}>
                    <div style={{width:"450px"}}>
                        <div style={{width:"300px", margin:"auto", marginBottom:"25px"}}>
                            <h1 style={{textAlign:"center"}}>{`${ action } Alert`}</h1>
                            <Input type="dropdown" label='Coin' options={options} defaultValue={selectedCoin} onChange={setSelectedCoin}/>
                            <Input type="dropdown" label='Condition' defaultValue={selectedCondition} onChange={setSelectedCondition} options={[
                                { value: 'Equals', label: 'Equals' },
                                { value: 'Above', label: 'Above' },
                                { value: 'Below', label: 'Below' },
                            ]}/>
                            <Input type="number" label='Price' id="edit-alert-price" value={selectedPrice} onChange={setSelectedPrice}/>

                            <Input type="toggle" id='edit-alert-email' toggleLabel="Email Notification"  checked={selectedEmail}/>
                            
                            <div className="edit-alert-modal-button-container">
                                <Input type="button" style={{width:"110px"}} disabled={isInvalid[0]} onClick={ action === 'Edit' ? editAlert : addAlert} value={ action }/>
                                <Input type="button" style={{width:"110px"}} onClick={() => setIsSetterModalOpen(false)} value="Cancel" red/>
                            </div>  

                            <p className={`alert-setter-error ${isInvalid[1] ? 'show' : ''}`} >{isInvalid[1] && `This alert already exists at ${isInvalid[1]}`}</p>        
                        </div>
                    </div>
                </Modal>


                <Modal open={isdeleteModalOpen} close={setIsdeleteModalOpen}>
                    <div style={{width:"450px"}}>
                        <div style={{width:"300px", margin:"auto", marginBottom:"50px"}}>
                            <h1 style={{textAlign:"center"}}>Confirm Alert Delete</h1>
                            <div className="edit-alert-modal-button-container">
                                <Input type="button" style={{width:"110px"}} onClick={ deleteAlert } value="Delete" red/>
                                <Input type="button" style={{width:"110px"}} onClick={() => setIsdeleteModalOpen(false)} value="Cancel"/>
                            </div> 
                        </div>
                    </div>
                </Modal>
            
        </BasicPage>
    )
}
