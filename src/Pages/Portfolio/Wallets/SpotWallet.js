import React from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import SidePanelInput from '../../../Components/SidePanel/SidePanelInput/SidePanelInput'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table from '../../../Components/Table/Table'

export default function SpotWallet() {
    const assets = require('../walletAssets.json');
    const portfolioValue = Object.values(assets).reduce((acc, asset) => acc + asset.value, 0);

  return (
    <BasicPage
        tabs={[
            { label:"Overview", path:"/portfolio"},
            { label:"History", path:"/portfolio/history"},
            { label:"Spot Wallet", path:"/portfolio/spot-wallet"},
            { label:"Future Wallet", path:"/portfolio/future-wallet"},
            { label:"Funding Wallet", path:"/portfolio/funding-wallet"},
        ]}>
        
        <SidePanelWithContainer 
            style={{height:"91vh"}}
            header="Transfer"
            sidePanel = {
                <div>
                    <SidePanelInput type="dropdown" label='Coin' placeholder="" options={[]} />
                    <SidePanelInput type="number" label='Quantity' />
                    <SidePanelInput type="dropdown" label='To' placeholder="" options={[
                        { value: 'spot', label: 'Spot Wallet' },
                        { value: 'Future', label: 'Future Wallet' },
                    ]}/>
                    <SidePanelInput type="button" value="Transfer" style={{marginTop:"40px"}}/>
                </div>
            }>

            <ValueBar usdBalance={assets.USD.quantity} portfolioValue={portfolioValue}/>
            
        </SidePanelWithContainer>
    </BasicPage>
  )
}
