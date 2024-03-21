import React,{useState,useEffect} from 'react'
import "./DashBoard.css";
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow } from '../../../Components/Table/Table'
import axios from 'axios';

export default function DashBoard() {


    const [action,setAction] = useState("Send")
    const [assets,setAssets] = useState([])
    const userId = 1;
    const [portfolioValue,setPortfolioValue] = useState(0)
    const [usdBalance,setUsdBalance] = useState(0)
    const [isLoading,setIsLoading] = useState(true)





    useEffect(()=>{
        setIsLoading(true)

        axios.get("http://localhost:8005/wallet/"+userId)
        .then(res=>{
            console.log(res.data);
            setPortfolioValue (res.data.portfolioValue) 
            setUsdBalance  (res.data.usdBalance)
            setAssets(res.data.assets)
        })
        .catch(error=>{
            console.log(error);
        })

        setIsLoading(false)
    },[])


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
                        <Input type="text" label='Wallet Address'/> 

                        <Input type="dropdown" label='Coin' options={
                              Object.keys(assets).slice(1).map(assetKey => ({
                                  value: assetKey, 
                                  label: assetKey
                              }))
                          } />
                        <Input type="number" label='Quantity' />

                        <Input type="button" value="Transfer" style={{marginTop:"50px"}}/>    
                     </div>
                     : <p>mjhv jvmsc</p>
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
                                [ coin.coin ], 
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
