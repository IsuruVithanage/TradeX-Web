import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Modal from '../../../Components/Modal/Modal'
import Table, { TableRow, Coin } from '../../../Components/Table/Table'
import { showMessage } from '../../../Components/Message/Message';
import axios from 'axios';
import './PortfolioWallet.css'

export default function FundingWallet() {
    const params = useParams().wallet === 'fundingWallet' ? 'fundingWallet' : 'tradingWallet';
    const [ currentWallet, SetCurrentWallet ] = useState(params);
    const [ selectedCoin, setSelectedCoin ] = useState('');
    const [ selectedQty, setSelectedQty ] = useState(null);
    const [ selectedWallet, setSelectedWallet ] = useState(undefined);
    const [ walletAddressValue, setWalletAddressValue ] = useState(null);
    const [ assets, setAssets ] = useState([]);
    const [ usdBalance, setUsdBalance ] = useState(null);
    const [ portfolioValue, setPortfolioValue ] = useState(null);
    const [ walletAddress, setWalletAddress ] = useState(null);
    const [ isInvalid, setIsInvalid ] = useState([true, null]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ showModal, setShowModal ] = useState(false);
    const backendApiEndpoint = 'http://localhost:8011/portfolio/asset/';
    const userId = 1;

    
    useEffect(()=>{
        SetCurrentWallet(params)
    }, [params])

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
                    walletAddressValue )
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

    }, [assets, selectedCoin, selectedQty, selectedWallet, walletAddressValue, currentWallet]);


    useEffect(() => {
        currentWallet === 'tradingWallet' ?  
        setSelectedWallet('fundingWallet') :
        setSelectedWallet(null);
        setSelectedCoin(null);
        setSelectedQty(null);
        setAssets([]);
        setUsdBalance(null);
        setPortfolioValue(null);
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
                setUsdBalance(res.data.usdBalance);
                setPortfolioValue(res.data.portfolioValue);
                setWalletAddress(res.data.walletAddress);
                setIsLoading(false);
            })
    
            .catch(error => {
                setIsLoading(false);
                setUsdBalance(0);
                setPortfolioValue(0);
                console.log("error", error);

                error.response ? 
                showMessage(error.response.status, error.response.data.message)   :
                showMessage('error', 'Database connection failed..!') ;
            });
    }, [ currentWallet ]);


    const transfer = () => {
        currentWallet === 'tradingWallet' ? 
        setSelectedWallet('fundingWallet') :
        setSelectedWallet(null);
        setSelectedCoin(null);
        setSelectedQty(null);
        setIsLoading(true);


        const data = {
            userId: userId,
            coin: selectedCoin,
            quantity: selectedQty,
            sendingWallet: currentWallet === 'fundingWallet' ? 'fundingWallet' : 'tradingWallet',
            receivingWallet: selectedWallet === 'externalWallet' ? 
            document.getElementById('walletAddressValue').value : selectedWallet
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
                setIsLoading(false);
                showMessage('success', 'Transaction Successful..!') ;
            })
    
            .catch(error => {
                setIsLoading(false);
                console.log("error", error);
                
                error.response ? 
                showMessage(error.response.status, error.response.data.message)   :
                showMessage('error', 'Transaction Failed..!') ;
            });
    }

 
    
    return (
        <BasicPage
            isLoading={isLoading}

            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
                { label:"Trading Wallet", path:"/portfolio/tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/fundingWallet"},
            ]}> 

            
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
                                <Input type="text" label='Wallet Address' id="walletAddressValue" onChange={setWalletAddressValue}/> 
                            </div> 
                        }
                        <div className={`traveling-input ${currentWallet === "fundingWallet" && selectedWallet === 'externalWallet' ? "goDown" : ""}`}>
                            <Input type="button" value="Transfer" onClick={transfer} disabled={isInvalid[0]} style={{marginTop:"50px"}}/> 

                            <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > { isInvalid[1] } </p>              
                        </div>

                        <p className='wallet-address-button' onClick={() => setShowModal(true)} >Wallet Address</p>    
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
                                <Coin>{asset.symbol}</Coin>, 
                                asset.tradingBalance,
                                asset.holdingBalance,
                                asset.marketPrice, 
                                "$ " + asset.value.toLocaleString("en-US", { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2,
                                }),
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ] :
                            [
                                <Coin>{asset.symbol}</Coin>, 
                                asset.fundingBalance,
                                asset.marketPrice, 
                                "$ " + asset.value.toLocaleString("en-US", { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2,
                                }),
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ]
                        }/>
                    ))}
                </Table> 


            </SidePanelWithContainer>




            <Modal open={showModal} close={setShowModal}>
                <div style={{width:"450px"}}>
                    <div style={{width:"300px", margin:"auto", marginBottom:"50px"}}>
                        <h1 style={{textAlign:"center"}}>Wallet Address</h1>
                        <p className='wallet-address' >{walletAddress}</p>
                        <div className="edit-alert-modal-button-container">
                            <Input type="button" style={{width:"100px"}} onClick={() => {
                                navigator.clipboard.writeText(walletAddress);
                                showMessage('success', 'Copied to clipboard..!');
                            }} value="Copy"/>
                            <Input type="button" style={{width:"120px"}} onClick={() => setShowModal(false)} value="Re-generate" red/>
                        </div> 
                    </div>
                </div>
            </Modal>
        </BasicPage>
    )
}