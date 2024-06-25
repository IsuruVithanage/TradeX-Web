import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { showMessage } from '../../../Components/Message/Message';
import { getUser } from '../../../Storage/SecureLs';
import notificationManager from '../../Alert/notificationManager';
import Table, { TableRow, Coin } from '../../../Components/Table/Table'
import BasicPage from '../../../Components/Layouts/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/Layouts/SidePanel/SidePanelWithContainer'
import { MdOutlineAssignment, } from "react-icons/md";
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Modal from '../../../Components/Modal/Modal'
import coins from '../../../Assets/Images/Coin Images.json'
import axios from 'axios';
import './PortfolioWallet.css'



export default function FundingWallet() {
    const currentWallet = useLocation().pathname === '/portfolio/fundingWallet' ? 'fundingWallet' : 'tradingWallet';
    const [ selectedCoin, setSelectedCoin ] = useState('');
    const [ selectedQty, setSelectedQty ] = useState(null);
    const [ selectedWallet, setSelectedWallet ] = useState(null);
    const [ walletAddressValue, setWalletAddressValue ] = useState('');
    const [ assets, setAssets ] = useState([]);
    const [ usdBalance, setUsdBalance ] = useState(null);
    const [ portfolioValue, setPortfolioValue ] = useState(null);
    const [ walletAddress, setWalletAddress ] = useState(null);
    const [ isInvalid, setIsInvalid ] = useState({status: true, message: null});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isRegenerate, setIsRegenerate ] = useState(false);
    const backendApiEndpoint = 'http://localhost:8011/portfolio/asset/';
    const user = getUser();
    const userId = user && user.id;
    const userName = user && user.userName;
    

    useEffect(() => {
        if(!isModalOpen) 
        setIsRegenerate(false);
    }, [isModalOpen]);



    useEffect(() => {
        currentWallet === 'tradingWallet' ?  
        setSelectedWallet('fundingWallet') :
        setSelectedWallet(null);
        setSelectedCoin(null);
        setSelectedQty(null);
        setUsdBalance(null);
        setPortfolioValue(null);
        setIsLoading(true);
        setAssets([]); 

        const getWalletData = async () => {  
            await axios.get(
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
                console.log(res.data);
                setAssets(res.data.assets);
                setUsdBalance(res.data.usdBalance);
                setPortfolioValue(res.data.portfolioValue);
                setWalletAddress(res.data.walletAddress);
            })
    
            .catch(error => {
                setUsdBalance(0);
                setPortfolioValue(0);
                console.log("error", error);

                error.response ? 
                showMessage(error.response.status, error.response.data.message)   :
                showMessage('error', 'Database connection failed..!') ;
            });
        }

        getWalletData().then(() => setIsLoading(false));
        

        notificationManager.onAppNotification(() => {
            getWalletData();
        });

        return () => {
            notificationManager.onAppNotification(() => {});
        }
    }, [ currentWallet, userId ]);



    useEffect(() => {
        let status = true;
        let message = null;

        if(currentWallet === 'tradingWallet') {

            if ( (selectedCoin && selectedQty) ) {
                status = false;
                message = null;

                const asset = assets.find(asset => asset.symbol === selectedCoin);

                if (selectedQty > asset.tradingBalance) {
                    status = true;
                    message = "Insufficient Balance";
                }
            } else {
                if (selectedCoin || selectedQty) {
                    status = true;
                    message = "Please fill all the fields";
                } else {
                    status = true;
                    message = null;
                }
            }

        } else if (currentWallet === 'fundingWallet') {

            if ( selectedCoin && selectedQty && selectedWallet ) {

                if  ( selectedWallet === 'tradingWallet' || 
                    ( selectedWallet === 'externalWallet' && 
                    walletAddressValue )
                ) {
                    status = false;
                    message = null;
                } else {
                    status = true;
                    message = "Please fill all the fields";
                }

                const asset = assets.find(asset => asset.symbol === selectedCoin);
                
                if (selectedQty > asset.fundingBalance) {
                    status = true;
                    message = "Insufficient Balance";
                }
            } else {
                if(selectedCoin || selectedQty  || selectedWallet) {
                    status = true;
                    message = "Please fill all the fields";
                } else {
                    status = true;
                    message = null;
                }
            }
        }

        if(isInvalid.status !== status || isInvalid.message !== message){
            setIsInvalid({status, message});
        }

    }, [isInvalid, assets, selectedCoin, selectedQty, selectedWallet, walletAddressValue, currentWallet]);



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
            sendingWallet: selectedWallet === 'externalWallet' ? walletAddress : currentWallet,
            receivingWallet: selectedWallet === 'externalWallet' ? walletAddressValue : selectedWallet
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


    const regenerateAddress = () => {
        setIsLoading(true);

        axios
        .post(
            'http://localhost:8011/portfolio/address/new',
            {
                userId: userId,
                userName: userName
            }
        )

        .then(res => {
            setWalletAddress(res.data.walletAddress);
            setIsLoading(false);
            setIsRegenerate(false);
            showMessage('success', 'Wallet Address Regenerated..!');
        })

        .catch(error => {
            setIsLoading(false);
            console.log("error", error);
            
            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Database connection failed..!') ;
        });
    }

 
    
    return (
        <BasicPage
            isLoading={isLoading}

            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"Trading Wallet", path:"/portfolio/tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/fundingWallet"},
                { label:"History", path:"/portfolio/history"}
            ]}> 

            
            <SidePanelWithContainer 
                style={{height:"91vh", minHeight: selectedWallet !== 'externalWallet' ? "520px" : "620px"}}
                header="Transfer"
                sidePanel = {
                    <div>
                        <Input type="dropdown" label='Coin' value={selectedCoin} onChange={setSelectedCoin} options={
                            assets.map(asset => (asset.symbol ? {
                                value: asset.symbol, 
                                label: asset.symbol + " - " + coins[asset.symbol].name,
                            } : null)).filter(option => option !== null)
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
                            <div className='hidden-input'>
                                <div style={{width: "91%"}}>
                                    <Input type="text" label='Wallet Address' value={walletAddressValue} onChange={(e) => setWalletAddressValue(e.target.value)}/> 
                                </div>
                                <div className="paste-text-button" onClick={async() => setWalletAddressValue(await navigator.clipboard.readText())}>
                                    <MdOutlineAssignment/>
                                </div>
                                <div className='paste-bottom-layer' />
                            </div> 
                        }

                        <div className={`traveling-input ${currentWallet === "fundingWallet" && selectedWallet === 'externalWallet' ? "goDown" : ""}`}>
                            <Input type="button" value="Transfer" onClick={transfer} disabled={isInvalid.status} style={{marginTop:"50px"}}/> 

                            <p className={`alert-invalid-message ${isInvalid.message ? 'show' : ''}`} > { isInvalid.message } </p>              
                        </div>

                        <p className='wallet-address-button' onClick={() => setIsModalOpen(true)} >Wallet Address</p>    
                    </div>
                }>

                    
                <ValueBar 
                    portfolioValue={ portfolioValue }
                    usdBalance={ usdBalance }
                />

               
                <Table emptyMessage="No Assets to show" restart={assets}>
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
                                asset.value,
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ] :
                            [
                                <Coin>{asset.symbol}</Coin>, 
                                asset.fundingBalance,
                                asset.marketPrice, 
                                asset.value,
                                <span style={{ color: asset.RoiColor }}>{asset.ROI}</span>
                            ]
                        }/>
                    ))}
                </Table> 


            </SidePanelWithContainer>




            <Modal open={isModalOpen} close={setIsModalOpen}>
                <div style={{width:"420px", paddingTop:"15px"}}>
                    <div style={{width:"320px", margin:"auto", marginBottom:"35px"}}>
                        <h1 style={{textAlign:"center", marginBottom: "25px"}}>Wallet Address</h1>

                        <div className='wallet-address' onClick={() =>{
                            if(!walletAddress){
                                showMessage('warning', 'Nothing to copy..!');
                            } else {
                                navigator.clipboard.writeText(walletAddress); 
                                showMessage('info', 'Copied to clipboard..!');
                            }
                        }}>
                            <span style={{width: "80%", userSelect: "text", cursor: "text"}}>{walletAddress || 'Wallet Address Not Found..!'}</span>
                        </div>

                        <p style={{textAlign:"center", marginTop:"18px", color: "#9E9E9E"}}><i>Click on the address to copy</i></p>
                        {!isRegenerate ?
                            <p style={{textAlign:"center", margin:"35px auto", color: "#9E9E9E", width: "97%"}}>
                                <i style={{color: "#21db9a", margin: "0"}}>Note:</i>
                                &ensp;If you Regenerate a new wallet Address, your old address is no longer valid for<br/> making transactions.
                            </p> :
                            <p style={{textAlign:"center", margin:"35px auto", color: "#9E9E9E", width: "100%"}}>
                                <i style={{color: "#21db9a", margin: "0"}}>Are you sure?</i>
                                &ensp;Do you still wish to generate a new wallet address? This action cannot be undone. 
                            </p>
                        }

                        <div className="edit-alert-modal-button-container" style={{width: "83%"}}>
                            <Input 
                                type="button" style={{width:"120px"}} 
                                value={!isRegenerate ? "Re-generate" : "Confirm"}
                                onClick={() => {
                                    !isRegenerate ?  setIsRegenerate(true) : regenerateAddress();
                                }} />

                            <Input 
                                type="button" style={{width:"120px"}} red
                                value={!isRegenerate ? "Close" : "Cancel"}
                                onClick={() => {
                                    !isRegenerate ?  setIsModalOpen(false) : setIsRegenerate(false);
                                }} />
                        </div> 
                    </div>
                </div>
            </Modal>
        </BasicPage>
    )
}