import React,{useState} from 'react'
import "./DashBoard.css";
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import Input from '../../../Components/Input/Input'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRow } from '../../../Components/Table/Table'

export default function DashBoard() {

    const [action,setAction] = useState("Send")
    const assets = require('./walletAssets.json');
    let portfolioValue = 0;


    portfolioValue = Object.values(assets).reduce((acc, asset) => acc + asset.value, 0);

    return (
        <BasicPage sideNavBar = {false}
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
                     : <p>mjhv jvmsc</p>/////////////
                     }

                                              

                    </div>
                }>
                    
                <ValueBar usdBalance={assets.USD.quantity} portfolioValue={portfolioValue}/>

                <Table>
                    <TableRow data={[
                        'Coin', 
                        'Quantity', 
                        'Market Price', 
                        'Value', 
                        'ROI'
                    ]}/>

                    { assets && Object.keys(assets).slice(1).map(coin => (
                        <TableRow 
                            key={coin} 
                            data={[
                                [ coin ], 
                                assets[coin].quantity, 
                                assets[coin].marketPrice, 
                                assets[coin].value, 
                                <span 
                                    style= {{ 
                                        color: ( assets[coin].roi < 0 ) ? 
                                        '#FF0000' : ( assets[coin].roi > 0 ) ? 
                                        '#21DB9A' : '' 
                                    }}>
                                    {`${assets[coin].roi} %`}
                                </span>
                            ]} 
                        />
                    ))}
                </Table> 
            </SidePanelWithContainer>
        </BasicPage>
    )
  
}
