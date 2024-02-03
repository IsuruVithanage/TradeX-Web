import React from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelInput from '../../Components/SidePanel/SidePanelInput/SidePanelInput';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import Table, { TableRaw } from '../../Components/Table/Table';
import { DatePicker } from 'antd';
import './Alert.css';
import ButtonComponent from "../../Components/Buttons/ButtonComponent";
// import 'antd/dist/antd.min.css';

export default function Alert(props) {

    const Tabs = [
      { label:"Home", path:"/"},
      { label:"Watchlist", path:"/watchlist"},
      { label:"Alert", path:"/alert"},
      { label:"Portfolio", path:"/portfolio"},
    ];
    
    const options = [
      { value: 'BTC', label: 'BTC' },
      { value: 'ETH', label: 'ETH' },
      { value: 'DOGE', label: 'DOGE' },
      { value: 'ADA', label: 'ADA' },
      { value: 'BNB', label: 'BNB' },
      { value: 'XRP', label: 'XRP' },
    ];

    const customPopupStyle = {
        backgroundColor: '#001529',
        color: 'white',
      };
    
      const getPopupContainer = (trigger) => trigger.parentNode;

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer 
                header = "Add Alert"
                sidePanel = {<div>
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

                <h1>Alert</h1>
                <p>This is Alert page content</p>
                <p>This is Home page content</p>

                <Table>
                    <TableRaw data={['Symbol', 'Amount', 'Price', 'Value', 'Change']}/>
                    <TableRaw data={['Btc', '100', '100000', '10000000', '100%']}/>
                    <TableRaw data={['Btc', '100', '100000', '10000000', '100%']}/>
                    <TableRaw data={['Btc', '100', '100000', '10000000', '100%']}/>
                </Table>
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
