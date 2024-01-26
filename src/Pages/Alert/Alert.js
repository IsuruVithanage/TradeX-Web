import React from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelInput from '../../Components/SidePanel/SidePanelInput/SidePanelInput';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import Table, { TableRaw } from '../../Components/Table/Table';
import MyTable, { MyTableRaw } from "../../Components/Table/MyTable/MyTable";

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
                    <SidePanelInput type="button" value="Add Alert" style={{marginTop:"40px"}}/>
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
                <MyTable>
                    <MyTableRaw data={['Symbol', 'Amount', 'Price', 'Value', 'Change']}/>
                    <MyTableRaw data={['Btc', '100', '100000', '1000000000000000000000', '100%']}/>
                    <MyTableRaw data={['Btc', '100', '100000', '1000000000000000000000', '100%']}/>
                    <MyTableRaw data={['Btc', '100', '100000', '1000000000000000000000', '100%']}/>
                </MyTable>

            </SidePanelWithContainer>
        </BasicPage>
    )
}
