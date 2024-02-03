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
                header = "Add Alert"
                sidePanel = {
                <div>
                    <Input type="dropdown" label='Coin' placeholder="" options={options}/>
                    <Input type="dropdown" label='Condition'  placeholder="" options={[
                        { value: 'equls', label: 'equls' },
                        { value: 'above', label: 'above' },
                        { value: 'below', label: 'below' },
                    ]}/>
                    <Input type="number" label='Price Threshold' id="number"/>
                    <Input type="date" label='End Date' />
                    <ButtonComponent>Add Alert</ButtonComponent>
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
