import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow } from '../../../Components/Table/Table'
import axios from 'axios';
import './PortfolioWallet.css'

export default function FundingWallet() {
    const wallet = new URLSearchParams(useLocation().search).keys().next().value;
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const [ assets, setAssets ] = useState([]);
    const [ usdBalance, setUsdBalance ] = useState(0);
    const [ portfolioValue, setPortfolioValue ] = useState(0);
    const backendApiEndpoint = 'http://localhost:8081/portfolio/asset/';
    const userId = 1;


    useEffect(() => {
        axios
            .get(
                backendApiEndpoint,
                {
                    params: {
                        userId: userId
                    }
                }
            )
    
            .then(res => {
                setAssets(res.data.assets);
                setPortfolioValue( 
                    wallet === 'tradingWallet' ? 
                    res.data.portfolioValue.tradingPortfolioValue : 
                    res.data.portfolioValue.fundingPortfolioValue
                );

                setUsdBalance( 
                    wallet === 'tradingWallet' ? 
                    res.data.usdBalance.tradingBalance + res.data.usdBalance.holdingBalance : 
                    res.data.usdBalance.fundingBalance
                );
            })
    
            .catch(err => {
                console.log(err);
            });
      }, [wallet]);
    





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
                    
                <ValueBar usdBalance={usdBalance} portfolioValue={portfolioValue}/>

                <Table emptyMessage="No Assets to show">
                    <TableRow data={ wallet === "tradingWallet" ? 
                        [
                            'Coin', 
                            'Trading Balance',
                            'Holding Balance',
                            'Market Price', 
                            'Value', 
                            'ROI'
                        ] :
                        [
                            'Coin', 
                            'Funding Balance',
                            'Market Price', 
                            'Value', 
                            'ROI'
                        ]
                    }/>

                    { assets && assets.map(asset => (
                        <TableRow 
                            key={asset.symbol} 
                            data={ wallet === "tradingWallet" ?
                            [
                                [ asset.symbol ], 
                                asset.tradingBalance,
                                asset.holdingBalance,
                                `$ ${asset.marketPrice.toFixed(2)}`, 
                                `$ ${((asset.tradingBalance + asset.holdingBalance) * asset.marketPrice).toFixed(2)}`,
                                <span 
                                    style={{
                                        color: asset.totalBalance > 0 ? "#21DB9A" : 
                                        asset.totalBalance < 0 ? "#ff0000" : ''
                                    }}>
                                    { asset.totalBalance } %
                                </span>
                            ] :
                            [
                                [ asset.symbol ], 
                                asset.fundingBalance,
                                `$ ${asset.marketPrice.toFixed(2)}`, 
                                `$ ${( asset.fundingBalance * asset.marketPrice ).toFixed(2)}`,
                                <span 
                                    style={{
                                        color: asset.totalBalance > 0 ? "#21DB9A" : 
                                        asset.totalBalance < 0 ? "#ff0000" : ''
                                    }}>
                                    { asset.totalBalance } %
                                </span>
                            ]
                        }/>
                    ))}
                </Table> 
            </SidePanelWithContainer>
        </BasicPage>
    )
}