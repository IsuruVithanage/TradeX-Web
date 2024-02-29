import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow } from '../../../Components/Table/Table'
import Modal from '../../../Components/Modal/Modal'
import axios from 'axios';
import './PortfolioWallet.css'

export default function FundingWallet() {
    const currentWallet = new URLSearchParams(useLocation().search).keys().next().value;
    const [ wallet, setWallet ] = useState(currentWallet);
    const [ selectedCoin, setSelectedCoin ] = useState('');
    const [ selectedQty, setSelectedQty ] = useState(null);
    const [ selectedWallet, setSelectedWallet ] = useState(undefined);
    const [ assets, setAssets ] = useState([]);
    const [ usdBalance, setUsdBalance ] = useState(0);
    const [ portfolioValue, setPortfolioValue ] = useState(0);
    const backendApiEndpoint = 'http://localhost:8081/portfolio/asset/';
    const userId = 1;


    useEffect(() => {
        axios
            .get(
                wallet === "tradingWallet" ? 
                backendApiEndpoint + "trading" :
                backendApiEndpoint + "funding",
                {
                    params: {
                        userId: userId
                    }
                }
            )
    
            .then(res => {
                setAssets(res.data.assets);
                setUsdBalance( res.data.usdBalance );
                setPortfolioValue( res.data.portfolioValue);
            })
    
            .catch(error => {
                error.response ? alert(error.response.data.message) :
                console.log("error", error);
            });
      }, [wallet]);


    
    return (
        <BasicPage
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
            ]}

            subPages={{
                onClick: setWallet,
                selectedPage: wallet,
                pages: [
                    { label:"Trading Wallet", value:"tradingWallet"},
                    { label:"Funding Wallet", value:"fundingWallet"},
                ],
            }}> 
            
            <SidePanelWithContainer 
                style={{height:"91vh"}}
                header="Transfer"
                sidePanel = {
                    <div>
                        <Input type="dropdown" label='Coin' options={
                            assets.filter(asset => asset.symbol !== 'USD').map(asset => ({
                                value: asset.symbol, 
                                label: asset.symbol
                            }))
                        } />


                        <Input type="number" label='Quantity' />


                        { 
                            wallet === "fundingWallet" &&
                            <div className={'hidden-input'} >
                                <Input type="dropdown" label='To' onChange={setSelectedWallet} 
                                    options={[
                                            { value: 'tradingWallet', label: 'Trading Wallet' },
                                            { value: 'externalWallet', label: 'External Wallet' },
                                        ]}
                                />
                            </div> 
                        }



                        <div className={`traveling-input ${wallet === "fundingWallet" ? "goDown" : ""}`}>
                        { 
                            wallet === "fundingWallet" && selectedWallet === 'externalWallet' &&
                            <div className={'hidden-input'} >
                                <Input type="text" label='Wallet Address' style={{width:"calc(100% + 70px)"}}/> 
                            </div> 
                        }
                            <div className={`traveling-input ${wallet === "fundingWallet" && selectedWallet === 'externalWallet' ? "goDown" : ""}`}>
                                <Input type="button" value="Transfer" style={{marginTop:"50px"}}/>                            
                            </div>
                        </div>
                    </div>
                }>

                    
                <ValueBar 
                    portfolioValue={ portfolioValue }
                    usdBalance={ usdBalance }
                />

               
                <Table emptyMessage="No Assets to show" restart={wallet}>
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
                                asset.marketPrice, 
                                asset.value,
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ] :
                            [
                                [ asset.symbol ], 
                                asset.fundingBalance,
                                asset.marketPrice, 
                                asset.value,
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ]
                        }/>
                    ))}
                </Table> 


            </SidePanelWithContainer>
        </BasicPage>
    )
}