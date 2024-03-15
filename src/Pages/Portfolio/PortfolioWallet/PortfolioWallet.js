import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow } from '../../../Components/Table/Table'
import Loading from '../../../Components/Loading/Loading';
import axios from 'axios';
import './PortfolioWallet.css'

export default function FundingWallet() {
    const params = useParams().wallet === 'fundingWallet' ? 'fundingWallet' : 'tradingWallet';
    const [ currentWallet, SetCurrentWallet ] = useState(params);
    const [ selectedCoin, setSelectedCoin ] = useState('');
    const [ selectedQty, setSelectedQty ] = useState(null);
    const [ selectedWallet, setSelectedWallet ] = useState(undefined);
    const [ walletAddress, setWalletAddress ] = useState(null);
    const [ assets, setAssets ] = useState([]);
    const [ usdBalance, setUsdBalance ] = useState(null);
    const [ portfolioValue, setPortfolioValue ] = useState(null);
    const [isInvalid, setIsInvalid] = useState([true, null]);
    const [ isLoading, setIsLoading ] = useState(true);
    const backendApiEndpoint = 'http://localhost:8004/portfolio/asset/';
    const userId = 1;



    useEffect(() => {

        if(currentWallet === 'tradingWallet') {

            if ( (selectedCoin && selectedQty) ) {
                setIsInvalid([false, null]);

                const asset = assets.find(asset => asset.symbol === selectedCoin);

                if (selectedQty > asset.tradingBalance) {
                    setIsInvalid([true, "Insufficient Balance"]);
                }
            } else {
                if ((!(!selectedCoin && !selectedQty))) {
                    setIsInvalid([true, "Please fill all the fields"]);
                } else {
                    setIsInvalid([true, null]);
                }
            }

        } else if (currentWallet === 'fundingWallet') {

            if ( selectedCoin && selectedQty && selectedWallet ) {

                if  ( selectedWallet === 'tradingWallet' || 
                    ( selectedWallet === 'externalWallet' && 
                    walletAddress )
                ) {
                    setIsInvalid([false, null]);
                } else {
                    setIsInvalid([true, "Please fill all the fields"]);
                }

                const asset = assets.find(asset => asset.symbol === selectedCoin);
                
                if (selectedQty > asset.fundingBalance) {
                    setIsInvalid([true, "Insufficient Balance"]);
                }
            } else {
                if((!(!selectedCoin && !selectedQty  && !selectedWallet))) {
                    setIsInvalid([true, "Please fill all the fields"]);
                } else {
                    setIsInvalid([true, null]);
                }
            }
        }

    }, [assets, selectedCoin, selectedQty, selectedWallet, walletAddress, currentWallet]);


    useEffect(() => {
        currentWallet === 'tradingWallet' ?  
        setSelectedWallet('fundingWallet') :
        setSelectedWallet(null);
        setSelectedCoin(null);
        setSelectedQty(null);
        setIsLoading(true);
            
        axios
            .get(
                currentWallet === "tradingWallet" ? 
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
                setIsLoading(false);
            })
    
            .catch(error => {
                setIsLoading(false);
                setUsdBalance(0);
                setPortfolioValue(0);
                error.response ? alert(error.response.data.message) :
                console.log("error", error);
            });
    }, [ currentWallet ]);


    const transfer = () => {
        setSelectedCoin(null);
        setSelectedQty(null);
        currentWallet === 'tradingWallet' ? 
        setSelectedWallet('fundingWallet') :
        setSelectedWallet(null);


        const data = {
            userId: userId,
            coin: selectedCoin,
            quantity: selectedQty,
            sendingWallet: currentWallet === 'fundingWallet' ? 'fundingWallet' : 'tradingWallet',
            receivingWallet: selectedWallet === 'externalWallet' ? 
            document.getElementById('walletAddress').value : selectedWallet
        };


        axios
            .put(
                backendApiEndpoint,
                data,
                {
                    params: {
                        userId: userId
                    }
                }
            )
    
            .then(res => {
                console.log(res.data)
                setAssets(res.data.assets);
                setUsdBalance( res.data.usdBalance );
                setPortfolioValue( res.data.portfolioValue);
            })
    
            .catch(error => {
                error.response ? alert(error.response.data.message) :
                console.log("error", error);
            });
    }

 
    
    return (
        <BasicPage
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
            ]}

            subPages={{
                onClick: SetCurrentWallet,
                selectedPage: currentWallet,
                pages: [
                    { label:"Trading Wallet", value:"tradingWallet"},
                    { label:"Funding Wallet", value:"fundingWallet"},
                ],
            }}> 

            { isLoading && <Loading/>}
            
            <SidePanelWithContainer 
                style={{height:"91vh"}}
                header="Transfer"
                sidePanel = {
                    <div>
                        <Input type="dropdown" label='Coin' value={selectedCoin} onChange={setSelectedCoin} options={
                            assets.map(asset => ({
                                value: asset.symbol, 
                                label: asset.symbol
                            }))
                        } />


                        <Input type="number" value={selectedQty} label='Quantity' min={0} onChange={setSelectedQty} />


                        
                        <Input type="dropdown" label='Receiving Wallet' value={selectedWallet} disabled={currentWallet === 'tradingWallet'} onChange={setSelectedWallet} 
                            options={[
                                    { value: 'tradingWallet', label: 'Trading Wallet' },
                                    { value: 'fundingWallet', label: 'Funding Wallet' },
                                    { value: 'externalWallet', label: 'External Wallet' },
                                ].filter(option => option.value !== currentWallet) }
                        />



                        { currentWallet === "fundingWallet" && selectedWallet === 'externalWallet' &&
                            <div className={'hidden-input'} >
                                <Input type="text" label='Wallet Address' id="walletAddress" onChange={setWalletAddress}/> 
                            </div> 
                        }
                        <div className={`traveling-input ${currentWallet === "fundingWallet" && selectedWallet === 'externalWallet' ? "goDown" : ""}`}>
                            <Input type="button" value="Transfer" onClick={transfer} disabled={isInvalid[0]} style={{marginTop:"50px"}}/> 

                            <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > { isInvalid[1] } </p>                            
                        </div>
                    </div>
                }>

                    
                <ValueBar 
                    portfolioValue={ portfolioValue }
                    usdBalance={ usdBalance }
                />

               
                <Table emptyMessage="No Assets to show" restart={currentWallet}>
                    <TableRow data={ currentWallet === "tradingWallet" ? 
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
 
                    { assets && (currentWallet === "tradingWallet" ? assets : assets.slice(1)).map(asset => (  
                        <TableRow 
                            key={asset.symbol} 
                            data={ currentWallet === "tradingWallet" ?
                            [
                                [ asset.symbol ], 
                                asset.tradingBalance,
                                asset.holdingBalance,
                                asset.marketPrice, 
                                `$ ${asset.value.toFixed(2)}`,
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ] :
                            [
                                [ asset.symbol ], 
                                asset.fundingBalance,
                                asset.marketPrice, 
                                `$ ${asset.value.toFixed(2)}`,
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ]
                        }/>
                    ))}
                </Table> 


            </SidePanelWithContainer>
        </BasicPage>
    )
}