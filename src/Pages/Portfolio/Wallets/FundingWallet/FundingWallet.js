import React, { useState } from 'react'
import BasicPage from '../../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../../Components/SidePanel/SidePanelWithContainer'
import SidePanelInput from '../../../../Components/SidePanel/SidePanelInput/SidePanelInput'
import ValueBar from '../../../../Components/ValueBar/ValueBar'
import Table, { TableRaw } from '../../../../Components/Table/Table'
import './FundingWallet.css'

export default function FundingWallet() {
    const assets = require('../../walletAssets.json');
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const portfolioValue = Object.values(assets).reduce((acc, asset) => acc + asset.value, 0);

    const selectOnChange = (selectedValue, valueHolder) => {
        valueHolder(selectedValue);
    };

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
                        <SidePanelInput type="dropdown" label='Coin' options={
                            Object.keys(assets).slice(1).map(assetKey => ({
                                value: assetKey, 
                                label: assetKey
                            }))
                        } />
                        <SidePanelInput type="number" label='Quantity' />
                        <SidePanelInput type="dropdown" label='To' onChange={selectOnChange} valueHolder={setSelectedWallet} id="mySelect" options={[ 
                            { value: 'spotWallet', label: 'Spot Wallet' },
                            { value: 'futureWallet', label: 'Future Wallet' },
                            { value: 'externalWallet', label: 'External Wallet' },
                        ]}/>
                        { selectedWallet === 'externalWallet' &&
                        <div className={'wallet-address-input'} >
                            <SidePanelInput type="text" label='Wallet Address'/> 
                        </div> }
                        <div className={`transfer-button ${selectedWallet === 'externalWallet' ? "down" : ""}`}>
                            <SidePanelInput type="button" value="Transfer" style={{marginTop:"40px"}}/>
                        </div>
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