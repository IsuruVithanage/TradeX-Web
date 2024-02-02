import React from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'

export default function FundingWallet() {
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
            header="Transfer"
            sidePanel = {
                <div>
                    <div>Transfer</div>
                </div>
            }>

        </SidePanelWithContainer>
    </BasicPage>
  )
}
