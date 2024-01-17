import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelInput from '../../Components/SidePanelItems/SidePanelInput/SidePanelInput';
import {SidePanel, ContainerWithSidePanel} from '../../Components/SidePanelItems/SidePanel/SidePanel';

export default function alert() {
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
            <SidePanel header="Add Alert">
                <SidePanelInput type="dropdown" label='Coin'  placeholder="" options={options}/>
                <SidePanelInput type="number" label='Price' />
                <SidePanelInput type="date" label='End Date' />
                <SidePanelInput type="button" value="Add Alert" style={{marginTop:"40px"}}/>
            </SidePanel>

            <ContainerWithSidePanel>
              <h1>Alert</h1>
              <p>
                This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content This is Home page content 
              </p>
            </ContainerWithSidePanel>
        </BasicPage>
    )
}
