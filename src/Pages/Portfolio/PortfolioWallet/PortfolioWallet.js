import React, { useState, useEffect } from 'react'
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useLocation } from 'react-router-dom'
import BasicPage from '../../../Components/Layouts/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/Layouts/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Modal from '../../../Components/Modal/Modal'
import Table, { TableRow, Coin } from '../../../Components/Table/Table'
import { showMessage } from '../../../Components/Message/Message';
import coins from '../../../Assets/Images/Coin Images.json'
import axios from 'axios';
import './PortfolioWallet.css'


export default function FundingWallet() {
    const params = useLocation().pathname === '/portfolio/fundingWallet' ? 'fundingWallet' : 'tradingWallet';
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
    const userName = 'Kasun Silva';
    
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
            showMessage('success', 'Wallet Address Regenerated..!') ;
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
                { label:"History", path:"/portfolio/history"},
                { label:"Trading Wallet", path:"/portfolio/tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/fundingWallet"},
            ]}> 

            
            <SidePanelWithContainer 
                style={{height:"91vh", minHeight: selectedWallet !== 'externalWallet' ? "520px" : "620px"}}
                header="Transfer"
                sidePanel = {
                    <div>
                        <Input type="dropdown" label='Coin' value={selectedCoin} onChange={setSelectedCoin} options={
                            assets.map(asset => ({
                                value: asset.symbol, 
                                label: asset.symbol + " - " + coins[asset.symbol].name,
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
                            <div className='hidden-input'>
                                <div style={{width: "91%"}}>
                                    <Input type="text" label='Wallet Address' value={walletAddressValue} onChange={(e) => setWalletAddressValue(e.target.value)}/> 
                                </div>
                                <div className="paste-text-button" onClick={async() => setWalletAddressValue(await navigator.clipboard.readText())}>
                                    {/* <AssignmentOutlinedIcon/> */}
                                </div>
                                <div className='paste-bottom-layer' />
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
                <div style={{width:"420px", paddingTop:"15px"}}>
                    <div style={{width:"320px", margin:"auto", marginBottom:"35px"}}>
                        <h1 style={{textAlign:"center", marginBottom: "25px"}}>Wallet Address</h1>

                        <div className='wallet-address' onClick={() =>{
                            navigator.clipboard.writeText(walletAddress);
                            showMessage('info', 'Copied to clipboard..!');
                        }}>
                            <span style={{width: "80%", userSelect: "text", cursor: "text"}}>{walletAddress || 'Wallet Address Not Found..!'}</span>
                        </div>

                        <p style={{textAlign:"center", marginTop:"18px", color: "#9E9E9E"}}><i>Click on the address to copy</i></p>
                        <p style={{textAlign:"center", margin:"35px auto", color: "#9E9E9E", width: "97%"}}>
                            <i style={{color: "#21db9a", margin: "0"}}>Note:</i>
                            &ensp;If you Regenerate a new wallet Address, your old address is no longer valid for<br/> making transactions.
                        </p>

                        <div className="edit-alert-modal-button-container" style={{width: "83%"}}>
                            <Input type="button" style={{width:"120px"}} onClick={regenerateAddress} value="Re-generate"/>
                            <Input type="button" style={{width:"120px"}} onClick={() => setShowModal(false)} value="Close" red/>
                        </div> 
                    </div>
                </div>
            </Modal>
        </BasicPage>
    )
}