import React,{useState,useEffect} from 'react'
import "./DashBoard.css";
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow,Coin} from '../../../Components/Table/Table'
import axios from 'axios';
import { showMessage } from '../../../Components/Message/Message';


export default function DashBoard() {


    const [action,setAction] = useState("Send")
    const [assets,setAssets] = useState([])
    const userId = 1;
    const [portfolioValue,setPortfolioValue] = useState(0)
    const [usdBalance,setUsdBalance] = useState(0)
    const [isLoading,setIsLoading] = useState(true)
    const [receivingWallet,setReceivingWallet] = useState(null)
    const [selectedCoin,setSelectedCoin] = useState("")
    const [quantity,setQuantity] = useState(null)
    const walletAddress = "wwwww"
    const [isInvalid,setIsInvalid] = useState([true,null])



    useEffect(()=>{
        setIsLoading(true)

        axios.get("http://localhost:8006/wallet/"+userId)
        .then(res=>{
            console.log(res.data);
            setPortfolioValue (res.data.portfolioValue) 
            setUsdBalance  (res.data.usdBalance)
            setAssets(res.data.assets)
            setIsLoading(false)

        })
        .catch(error=>{
            console.log(error);
            setIsLoading(false)

            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Transaction Failed..!') ;

        })

    },[])
 



  const transfer = () => {
    setReceivingWallet(null);
    setSelectedCoin(null);
    setQuantity(null);
    setIsLoading(true);


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


useEffect(() => {


        if ( (selectedCoin && quantity && receivingWallet) ) {
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

, [assets, selectedCoin, quantity,receivingWallet]);




    return (
        <BasicPage sideNavBar = {false} isLoading = {isLoading}
            tabs={[
                { label:"Dashboard", path:"/wallet/dashboard"},
                { label:"History", path:"/wallet/history"},
            ]}>
            
            <SidePanelWithContainer 
                style={{height:"75vh"}}
                header="Transfer"
                sidePanel = {
                    <div>
                      <Input type="switch" buttons = {["Send","Receive"]} onClick = {setAction}/>

                     {action === "Send" ?
                        <div> 
                            <Input type="text" label='Wallet Address'  onChange={(e)=> setReceivingWallet (e.target.value)}/> 

                            <Input type="dropdown" label='Coin' value = {selectedCoin} onChange={setSelectedCoin} options={
                                Object.values(assets).map(asset => ({
                                    value: asset.coin, 
                                    label: asset.coin
                                }))
                            } />
                            <Input type="number" label='Quantity' value = {quantity} onChange={setQuantity} />



                        <Input type="button" value="Transfer" onClick={transfer} disabled={isInvalid[0]} style={{marginTop:"50px"}}/> 

                        <p className={`alert-invalid-message ${isInvalid[1] ? 'show' : ''}`} > { isInvalid[1] } </p>     
                     </div>
                     : <p>...Wallet Address</p>
                     }

                                              

                    </div>
                }>
                    
                <ValueBar usdBalance={usdBalance} portfolioValue={portfolioValue}/>

                <Table>
                    <TableRow data={[
                        'Coin', 
                        'Quantity', 
                        'Market Price', 
                        'Value', 
                        'ROI'
                    ]}/>

                    { assets && assets.slice(1).map(coin => (
                        <TableRow 
                            key={coin.coin} 
                            data={[
                                <Coin>{coin.coin}</Coin>, 
                                coin.balance, 
                                coin.marketPrice, 
                                coin.value, 
                                <span 
                                    style= {{ 
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
