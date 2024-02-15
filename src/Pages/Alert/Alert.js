import React, { useState } from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from '../../Components/Input/Input';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import Table, { TableRaw } from '../../Components/Table/Table';
import ButtonComponent from "../../Components/Buttons/ButtonComponent";

export default function Alert() {
    let alerts = require('./Alerts.json')
    const [selectedPage, setSelectedPage] = useState("Running");

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
                    <Input type="number" label='Price' id="number" />
    
                    <ButtonComponent style={{marginTop: "50px"}}>Add Alert</ButtonComponent>
                </div>}>                

                <Table>
                    <TableRaw data={['Coin', 'Price', 'Condition', 'Email', 'Action']}/>

                    { alerts.map((alert, index) => {
                        return (
                        selectedPage === "Running" ? alert.Running === true ? 
                        <TableRaw key={index} data={[[alert.Coin], alert.Price, alert.Condition, (alert.Email) ? "On" : "Off"]}/>
                        : null : alert.Running === false ?
                        <TableRaw key={index} data={[[alert.Coin], alert.Price, alert.Condition, (alert.Email) ? "On" : "Off"]}/>
                        : null)
                    })}
                    
                </Table>

            </SidePanelWithContainer>
            
        </BasicPage>
    )
}
