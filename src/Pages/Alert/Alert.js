import React, { useState } from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelInput from '../../Components/SidePanel/SidePanelInput/SidePanelInput';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import Table, { TableRaw } from '../../Components/Table/Table';
import { DatePicker } from 'antd';
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

    const customPopupStyle = {
        backgroundColor: '#21db9a',
        color: 'white',
      };
    
      const getPopupContainer = (trigger) => trigger.parentNode;

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
                    <SidePanelInput type="dropdown" label='Coin' placeholder="" options={options}/>
                    <SidePanelInput type="dropdown" label='Condition'  placeholder="" options={[
                        { value: 'equls', label: 'equls' },
                        { value: 'above', label: 'above' },
                        { value: 'below', label: 'below' },
                    ]}/>
                    <SidePanelInput type="number" label='Price Threshold' id="number"/>
                    <SidePanelInput type="date" label='End Date' />
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
                <DatePicker
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        borderColor: 'gray',
                    }}
                    popupStyle={customPopupStyle}
                    getPopupContainer={getPopupContainer}
                    suffixIcon={<span style={{ color: 'white' }}>Custom Icon</span>}
                    format="DD-MM-YY"
                    placement="topLeft"
                />

            </SidePanelWithContainer>
            
        </BasicPage>
    )
}
