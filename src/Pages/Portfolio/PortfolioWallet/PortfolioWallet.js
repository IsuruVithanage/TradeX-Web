import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRaw } from '../../../Components/Table/Table'
import './PortfolioWallet.css'

export default function FundingWallet() {
    const wallet = new URLSearchParams(useLocation().search).keys().next().value;
    const walletAssets = require('./walletAssets.json');
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    let portfolioValue = 0;
    let assets = {};


    if (wallet === "fundingWallet") {
        assets = walletAssets.Funding
    }else{
        assets = walletAssets.Spot
    }
    portfolioValue = Object.values(assets).reduce((acc, asset) => acc + asset.value, 0);

    return (
        <BasicPage
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
                { label:"Trading Wallet", path:"/portfolio/wallet?tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/wallet?fundingWallet"},
            ]}>
            
            <SidePanelWithContainer 
                style={{height:"91vh"}}
                header="Transfer"
                sidePanel = {
                    <div>
                        <Input type="dropdown" label='Coin' options={
                            Object.keys(assets).slice(1).map(assetKey => ({
                                value: assetKey, 
                                label: assetKey
                            }))
                        } />


                        <Input type="number" label='Quantity' />


                        { 
                            wallet === "fundingWallet" &&
                            <Input type="dropdown" label='To' onChange={setSelectedWallet} 
                                options={[
                                        { value: 'tradingWallet', label: 'Trading Wallet' },
                                        { value: 'externalWallet', label: 'External Wallet' },
                                    ]}
                            />
                        }


                        { 
                            selectedWallet === 'externalWallet' &&
                            <div className={'wallet-address-input'} >
                                <Input type="text" label='Wallet Address'/> 
                            </div> 
                        }


                        <div className={`transfer-button ${selectedWallet === 'externalWallet' ? "down" : ""}`}>
                            <Input type="button" value="Transfer" style={{marginTop:"50px"}}/>                            
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

                    { assets && Object.keys(assets).slice(1).map(coin => (
                        <TableRaw 
                            key={coin} 
                            data={[
                                [ coin ], 
                                assets[coin].quantity, 
                                assets[coin].marketPrice, 
                                assets[coin].value, 
                                <span 
                                    style= {{ 
                                        color: ( assets[coin].roi < 0 ) ? 
                                        '#FF0000' : ( assets[coin].roi > 0 ) ? 
                                        '#21DB9A' : '' 
                                    }}>
                                    {`${assets[coin].roi} %`}
                                </span>
                            ]} 
                        />
                    ))}
                </Table> 
            </SidePanelWithContainer>
        </BasicPage>
    )
}