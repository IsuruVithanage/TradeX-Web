import React from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import SidePanelInput from '../../../Components/SidePanel/SidePanelInput/SidePanelInput'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRaw } from '../../../Components/Table/Table'

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
                    <SidePanelInput type="dropdown" label='Coin' placeholder="" options={
                        Object.keys(assets).slice(1).map(assetKey => ({
                            value: assetKey, 
                            label: assetKey
                        }))
                    }/>
                    <SidePanelInput type="number" label='Quantity' />
                    <SidePanelInput type="dropdown" label='To' placeholder="" options={[
                        { value: 'futureWallet', label: 'Future Wallet' },
                        { value: 'fundingWallet', label: 'Funding Wallet' },
                    ]}/>
                    <SidePanelInput type="button" value="Transfer" style={{marginTop:"40px"}}/>
                </div>
            }>

            <ValueBar usdBalance={assets.USD.quantity} portfolioValue={portfolioValue}/>
            <Table>
                <TableRaw data={[
                    'Coin', 
                    'Quantity', 
                    'Market Price', 
                    'Value', 
                    'ROI'
                ]}/>

                { assets && Object.keys(assets).slice(1).map(assetKey => (
                    <TableRaw 
                        key={assetKey} 
                        data={[
                        [assets[assetKey].symbol, assetKey], 
                        assets[assetKey].quantity, 
                        assets[assetKey].marketPrice, 
                        assets[assetKey].value, 
                        <span 
                            style= {{ 
                                color: ( assets[assetKey].roi < 0 ) ? 
                                '#FF0000' : ( assets[assetKey].roi > 0 ) ? 
                                '#21DB9A' : '' 
                            }}>
                            {`${assets[assetKey].roi} %`}
                        </span>
                        ]} 
                    />
                ))}
            </Table>
        </SidePanelWithContainer>
    </BasicPage>
  )
}
