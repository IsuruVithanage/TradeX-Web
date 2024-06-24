import React, { useState, useEffect } from 'react'
import "./DashBoard.css";
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow, Coin } from '../../../Components/Table/Table'
import axios from 'axios';
import { showMessage } from '../../../Components/Message/Message';
import { MdOutlineAssignment, } from "react-icons/md";
import coins from '../../../Assets/Images/Coin Images.json';

export default function DashBoard() {
    const [action, setAction] = useState("Send")
    const [assets, setAssets] = useState([])
    const [portfolioValue, setPortfolioValue] = useState(0)
    const [usdBalance, setUsdBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [receivingWallet, setReceivingWallet] = useState("")
    const [selectedCoin, setSelectedCoin] = useState("")
    const [quantity, setQuantity] = useState(null)
    const [isInvalid, setIsInvalid] = useState([true, null])
    const [walletAddress, setWalletAddress] = useState("")
    const userId = 1;
    const userName = "sayya";


    // initial data fetching
    useEffect(() => {
        setIsLoading(true)

        axios.get("http://localhost:8006/wallet/" + userId, {
            withCredentials: true,
        })
            .then(res => {
                console.log(res.data);
                setWalletAddress(res.data.address)
                setPortfolioValue(res.data.portfolioValue)
                setUsdBalance(res.data.usdBalance)
                setAssets(res.data.assets)
                setIsLoading(false)

            })
            .catch(error => {
                console.log(error);
                setIsLoading(false)

                error.response ?
                    showMessage(error.response.status, error.response.data.message) :
                    showMessage('error', 'Database connection Failed..!');

            })

    }, [])



    // assets tranfering function
    const transfer = () => {
        setIsLoading(true);
        console.log("quantity", quantity);


        const data = {
            userId: userId,
            coin: selectedCoin,
            quantity: quantity,
            sendingWallet: walletAddress,
            receivingWallet: receivingWallet,
        };


        axios
            .put(
                "http://localhost:8006/wallet/",
                data,
                {
                    params: { userId: userId },
                    withCredentials: true,
                }
            )
            // set new fetch data
            .then(res => {
                console.log(res.data)
                setAssets(res.data.assets);
                setUsdBalance(res.data.usdBalance);
                setPortfolioValue(res.data.portfolioValue);
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
            userId, userName, withCredentials: true
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

            if (quantity > asset.balance) {
                setIsInvalid([true, "Insufficient Balance"]);
            }
        } else {
            if (selectedCoin || quantity || receivingWallet) {
                setIsInvalid([true, "Please fill all the fields"]);
            } else {
                setIsInvalid([true, null]);
            }


        }

    }
        , [assets, selectedCoin, quantity, receivingWallet]);




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
                                <div className='address-input'>
                                    <div style={{width: "91%"}}>
                                        <Input type="text" label='Wallet Address' value={receivingWallet} onChange={(e) => setReceivingWallet(e.target.value)} /> 
                                    </div>
                                    <div className="paste-text-button" onClick={async() => setReceivingWallet(await navigator.clipboard.readText())}>
                                        <MdOutlineAssignment/>
                                    </div>
                                    <div className='paste-bottom-layer' />
                                </div> 

                                <Input type="dropdown" label='Coin' value={selectedCoin} onChange={setSelectedCoin} options={
                                    assets.map(asset => (asset.coin ? {
                                        value: asset.coin,
                                        label: asset.coin + " - " + coins[asset.coin].name,
                                    } : null)).filter(option => option !== null)
                                } />
                                <Input type="number" label='Quantity' min={0} value={quantity} onChange={setQuantity} />



                                <Input type="button" value="Transfer" onClick={transfer} disabled={isInvalid[0]} style={{ marginTop: "50px" }} />

                                <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > {isInvalid[1]} </p>
                            </div>
                            :
                            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div style={{ marginTop: "30px" }}>
                                    <p style={{ color: "#9e9e9e", fontSize: "17px", fontWeight: "bold" }}>Wallet Address:</p>
                                    <p className='address'>{walletAddress || "wallet Address not found"}</p>
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

                <ValueBar usdBalance={usdBalance} portfolioValue={portfolioValue} />

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
                                    style={{
                                        color: coin.RoiColor

                                    }}>
                                    {`${coin.ROI} %`}
                                </span>
                            ]}
                        />
                    ))}
                </Table>
            </SidePanelWithContainer>
        </BasicPage>
    )

}
