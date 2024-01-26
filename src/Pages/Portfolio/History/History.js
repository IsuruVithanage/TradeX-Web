import React from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer';
import SidePanelInput from '../../../Components/SidePanel/SidePanelInput/SidePanelInput';

export default function History() {
    const Tabs = [
        { label:"Portfolio", path:"/portfolio"},
        { label:"History", path:"/portfolio/history"},
        { label:"Home", path:"/"},
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
                line = {false}
                sidePanel={
                    <div>
                        <SidePanelInput type="dropdown" label='Coin' placeholder="" options={options}/>
                        <SidePanelInput type="dropdown" label='Trading Type'  placeholder="" options={[
                            { value: 'spot', label: 'Spot Trading' },
                            { value: 'Future', label: 'Future Trading' },
                        ]}/>
                        <SidePanelInput type="dropdown" label='Trading Action'  placeholder="" options={[
                            { value: 'buy', label: 'Buy' },
                            { value: 'sell', label: 'Sell' },
                        ]}/>
                        <SidePanelInput type="button" value="Show" style={{marginTop:"40px"}}/>
                        <SidePanelInput type="button" value="Export" />
                    </div>
                }>
            </SidePanelWithContainer>

        </BasicPage>
    )
}
