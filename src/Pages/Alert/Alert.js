import React, { useState } from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from '../../Components/Input/Input';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import Table, { TableRaw } from '../../Components/Table/Table';
import ButtonComponent from "../../Components/Buttons/ButtonComponent";
import './Alert.css';

export default function Alert() {
    let alerts = require('./Alerts.json')
    const [selectedPage, setSelectedPage] = useState("Activated");
    const [alertRepeat, setAlertRepeat] = useState(undefined);

    console.log(alertRepeat)


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
                setSelectedPage: setSelectedPage,
                path: "/alert",
                labels: ["Activated", "Disabled"],
            }}
        >
            <SidePanelWithContainer 
                style={{height:"91vh"}}
                header = "Add Alert"
                sidePanel = {
                <div>
                    <Input type="dropdown" label='Coin' options={options}/>
                    <Input type="dropdown" label='Condition' options={[
                        { value: 'equls', label: 'Equls' },
                        { value: 'above', label: 'Above' },
                        { value: 'below', label: 'Below' },
                    ]}/>
                    <Input type="number" label='Price Threshold' id="number"/>
                    <Input type="dropdown" label='Repeat' onChange={ setAlertRepeat } options={[
                        { value: false, label: 'Once' },
                        { value: true, label: 'Repeat' },
                    ]}/>
                
                    { alertRepeat &&
                        <div className={'date-picker-input'} >
                            <Input type="date" label='End Date' />
                        </div> 
                    }
                        <div className={`alert-button ${alertRepeat ? "down" : ""}`}>
                            <ButtonComponent>Add Alert</ButtonComponent>
                        </div>
                </div>}>                

                <Table>
                    <TableRaw data={['Coin', 'Price', 'Condition', 'Email', 'Repeat']}/>

                    {alerts.map((alert, index) => {
                        return (
                        selectedPage === "Activated" ? alert.Active === true ? 
                        <TableRaw key={index} data={[[require('../../Assets/Images/Coin Images.json')[alert.Coin], alert.Coin], alert.Price, alert.Condition, (alert.Email) ? "On" : "Off", (alert.Repeat) ? alert.EndDate : "Once"]}/>
                        : null : alert.Active === false ?
                        <TableRaw key={index} data={[[require('../../Assets/Images/Coin Images.json')[alert.Coin], alert.Coin], alert.Price, alert.Condition, (alert.Email) ? "On" : "Off", (alert.Repeat) ? alert.EndDate : "Once"]}/>
                        : null)
                    })}
                    
                </Table>
                <br/>
                <br/>
                    
                <br/>
                <br/>
                

            </SidePanelWithContainer>
            
        </BasicPage>
    )
}
