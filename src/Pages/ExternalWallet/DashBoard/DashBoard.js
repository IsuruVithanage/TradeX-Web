import React, { useState, useEffect } from 'react'
import "./DashBoard.css";
import BasicPage from '../../../Components/Layouts/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/Layouts/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow, Coin } from '../../../Components/Table/Table'
import axios from 'axios';
import { showMessage } from '../../../Components/Message/Message';
import { MdOutlineAssignment, } from "react-icons/md";
import coins from '../../../Assets/Images/Coin Images.json';
import { getUser } from '../../../Storage/SecureLs';
import notificationManager from '../../Alert/notificationManager';
import Modal from '../../../Components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function DashBoard() {
    const navigate = useNavigate();
    const user = getUser();
    const userId = user && user.id;
    const walletId = user && user.walletId;
    const [action, setAction] = useState("Send")
    const [assets, setAssets] = useState([])
    const [walletValue, setWalletValue] = useState(0)
    const [usdBalance, setUsdBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [receivingWallet, setReceivingWallet] = useState("")
    const [selectedCoin, setSelectedCoin] = useState("")
    const [quantity, setQuantity] = useState(null)
    const [isInvalid, setIsInvalid] = useState([true, null])
    const [walletAddress, setWalletAddress] = useState("")
    const [ isConfirmModalOpen, setIsConfirmModalOpen ] = useState(false);



    // initial data fetching
    useEffect(() => {

        const getWalletData = async () => {
            setIsLoading(true);
            
            axios.get("http://localhost:8006/wallet/" + walletId, {
                withCredentials: true,
            })
            .then(res => {
                console.log(res.data);
                setWalletAddress(res.data.address)
                setWalletValue(res.data.walletValue)
                setUsdBalance(res.data.usdBalance)
                setAssets(res.data.assets)
                setIsLoading(false)

            })
            .catch(error => {
                console.log(error);
                setWalletValue(0)
                setUsdBalance(0)
                setIsLoading(false)

                error.response ?
                showMessage(error.response.status, error.response.data.message) :
                showMessage('error', 'Database connection Failed..!');

            });
        }

        if(!walletId){
            navigate('/wallet');
         }else{
            getWalletData(); 
         }
         
        notificationManager.onAppNotification(() => {
            getWalletData();
        });

        return () => {
            notificationManager.onAppNotification(() => { });
        }

    }, [walletId])



    // assets tranfering function
    const transfer = () => {
        setIsLoading(true);

        const data = {
            walletId: walletId,
            userId: userId,
            coin: selectedCoin,
            quantity: quantity,
            sendingWallet: walletAddress,
            receivingWallet: receivingWallet,
        };


        axios
            .put(
                "http://localhost:8006/wallet/",
                data, {  withCredentials: true, }
            )
            // set new fetch data
            .then(res => {
                console.log(res.data)
                setAssets(res.data.assets);
                setUsdBalance(res.data.usdBalance);
                setWalletValue(res.data.walletValue);
                setReceivingWallet("");
                setSelectedCoin(null);
                setQuantity(null);
                setIsLoading(false);
                showMessage('success', 'Transaction Successful..!');
            })

            .catch(error => {
                setIsLoading(false);
                console.log("error", error);

                error.response ?
                    showMessage(error.response.status, error.response.data.message) :
                    showMessage('error', 'Transaction Failed..!');
            });

    }

    const regenerateAddress = async () => {
        setIsLoading(true);

        axios.post("http://localhost:8006/wallet/generateAddress", {
            walletId, withCredentials: true
        })
        .then((res) => {
            setWalletAddress(res.data.walletAddress);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log("Address regenerate failed", error);
            showMessage("error", "Address regenerate failed");
            setIsLoading(false);
        })
    }


    // validate inputs fields
    useEffect(() => {
        if ((selectedCoin && quantity && receivingWallet)) {
            setIsInvalid([false, null]);

            const asset = assets.find(asset => asset.coin === selectedCoin);

            if (asset && quantity > asset.balance) {
                setIsInvalid([true, "Insufficient Balance"]);
            }
        }else {
            if (selectedCoin || quantity || receivingWallet) {
                setIsInvalid([true, "Please fill all the fields"]);
            } else {
                setIsInvalid([true, null]);
            }


        }

    }, [assets, selectedCoin, quantity, receivingWallet]);




    return (
        <BasicPage sideNavBar={false} isLoading={isLoading}
            tabs={[
                { label: "Dashboard", path: "/wallet/dashboard" },
                { label: "History", path: "/wallet/history" },
            ]}>

            <SidePanelWithContainer
                style={{ height: "91vh" }}
                header="Transfer"
                sidePanel={
                    <div>
                        <Input type="switch" buttons={["Send", "Receive"]} onClick={setAction} />

                        {action === "Send" ?
                            <div>
                                <Input type="text" label='Wallet Address' value={receivingWallet} 
                                    icon={<MdOutlineAssignment className='paste-text-icon'/>}
                                    onIconClick={async() => setReceivingWallet(await navigator.clipboard.readText())}
                                    onChange={(e) => setReceivingWallet(e.target.value)} 
                                /> 

                                <Input type="dropdown" label='Coin' value={selectedCoin} onChange={setSelectedCoin} options={
                                    assets.map(asset => (asset.coin ? {
                                        value: asset.coin,
                                        label: asset.coin + " - " + coins[asset.coin].name,
                                    } : null)).filter(option => option !== null)
                                } />

                                <Input type="number" label='Quantity' min={0} value={quantity} onChange={setQuantity} />

                                <Input type="button" value="Transfer" onClick={() => setIsConfirmModalOpen(true)} disabled={isInvalid[0]} style={{ marginTop: "50px" }} />

                                <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > {isInvalid[1]} </p>
                            </div>
                            :
                            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div style={{ marginTop: "30px" }}>
                                    <p style={{ color: "#9e9e9e", fontSize: "17px", fontWeight: "bold" }}>Wallet Address:</p>
                                    <p className='address1'>{walletAddress || "wallet Address not found"}</p>
                                </div>
                                <Input type="button" value="Copy" style={{ marginTop: "20px" }} onClick={() => {
                                    navigator.clipboard.writeText(walletAddress);
                                    showMessage("info", "Address copied");
                                }} />

                                <p style={{ textAlign: "center", margin: "35px auto", color: "#9E9E9E", width: "97%" }}>
                                    <i style={{ color: "#21db9a", margin: "0" }}>Note:</i>
                                    &ensp;If you Regenerate a new wallet Address, your old address is no longer valid for<br /> making transactions.
                                </p>

                                <Input type="button" value="Regenerate" red style={{ marginTop: "20px" }} onClick={regenerateAddress} />
                            </div>
                        }



                    </div>
                }>

                <ValueBar usdBalance={usdBalance} value={walletValue} type = 'wallet' />

                <Table emptyMessage="No Holdings to Show">
                    <TableRow data={[
                        'Coin',
                        'Quantity',
                        'Market Price',
                        'Value',
                        'ROI'
                    ]} />
                    {/* data mapping to table */}
                    {assets && assets.slice(1).map(coin => (
                        <TableRow
                            key={coin.coin}
                            data={[
                                <Coin>{coin.coin}</Coin>,
                                coin.balance,
                                coin.marketPrice,
                                coin.value,
                                <span
                                    style={{ color: coin.RoiColor }}>
                                    {coin.ROI}
                                </span>
                            ]}
                        />
                    ))}
                </Table>
            </SidePanelWithContainer>


            <Modal open={isConfirmModalOpen} close={setIsConfirmModalOpen}>
                <div style={{width:"420px", paddingTop:"15px"}}>
                    <div style={{width:"320px", margin:"auto", marginBottom:"35px"}}>
                        <div>
                            <h1 style={{color: "#FFFFFF"}}>Transfer Confirmation</h1>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "25px"}}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src={selectedCoin && coins[selectedCoin].img} alt={selectedCoin} width="30px"/>
                                    <div style={{marginLeft: "10px"}}>
                                        <p style={{margin: "0", fontSize: "16px"}}>{selectedCoin && coins[selectedCoin].name}</p>
                                        <p style={{margin: "0", color: "#9E9E9E", fontWeight: "600"}}>{selectedCoin}</p>
                                    </div>
                                </div>

                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <span style={{color: "#FF0000", fontWeight: "700"}}>{
                                        selectedCoin && quantity && assets.find(asset => asset.coin === selectedCoin) &&
                                        (quantity / assets.find(asset => asset.coin === selectedCoin).balance * 100).toFixed(2)
                                    } %</span>
                                    <p style={{color: "#9E9E9E", marginTop: "3px"}}>of Your Balance</p>
                                </div>
                            </div>

                            <div style={{marginTop: "50px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "#FFFFFF", fontWeight: "600"}}>To</span>
                                <span style={{color: "#9E9E9E", width: "65%", textAlign: "center", fontSize: "12px"}}>{receivingWallet}</span>
                            </div>

                            <hr style={{borderColor: "#6D6D6D", margin: "25px 0"}}/>

                            <div style={{marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "#FFFFFF", fontWeight: "600"}}>Quantity</span>
                                <span style={{color: "#9E9E9E", width: "65%", textAlign: "right"}}>{quantity}</span>
                            </div>
                        </div>

                        <div className="edit-alert-modal-button-container" style={{width: "83%"}}>
                            <Input
                                type="button" 
                                style={{width:"120px"}}
                                value="Confirm"
                                onClick={() => {setIsConfirmModalOpen(false); transfer()}} 
                            />

                            <Input
                                type="button" style={{width:"120px"}} red
                                value="Cancel"
                                onClick={() => setIsConfirmModalOpen(false)} />
                        </div>
                    </div>
                </div>
            </Modal>
        </BasicPage>
    )

}
