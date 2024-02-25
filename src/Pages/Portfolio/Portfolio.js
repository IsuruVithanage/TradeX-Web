import React, { useState, useEffect } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import LineChart from '../../Components/Charts/LineChart/LineChar';
import BarChart from '../../Components/Charts/BarChart/BarChart';
import ValueBar from '../../Components/ValueBar/ValueBar';
import Table, { TableRow } from '../../Components/Table/Table';
import axios from 'axios';

export default function Portfolio() {
  const [ assets, setAssets ] = useState([]);
  const [ usdBalance, setUsdBalance ] = useState(0);
  const [ portfolioValue, setPortfolioValue ] = useState(0);
  const initialData = require('./portfolio-data.json');
  const backendApiEndpoint = 'http://localhost:8081/portfolio/asset/overview';
  const userId = 1;
  

  useEffect(() => {
    axios
        .get(
            backendApiEndpoint,
            {
                params: {
                    userId: userId
                }
            }
        )

        .then(res => {
            console.log(res.data)
            setAssets(res.data.assets);
            setPortfolioValue(res.data.portfolioValue);
            setUsdBalance(res.data.usdBalance);
        })

        .catch(error => {
            console.log(error);
            alert(error.message + "! \nCheck Your Internet Connection");
        });
  }, []);

 
  const bars = assets.map(asset => ({
      coinName: asset.symbol,
      percentage: (asset.value / portfolioValue) * 100

  })).concat( portfolioValue !== 0 ? { 
      coinName: 'USD', 
      percentage: (usdBalance / portfolioValue) * 100 
      
  } : [] );



  return (
    <BasicPage 
        tabs={[
          { label:"Overview", path:"/portfolio"},
          { label:"History", path:"/portfolio/history"},
          { label:"Trading Wallet", path:"/portfolio/wallet?tradingWallet"},
          { label:"Funding Wallet", path:"/portfolio/wallet?fundingWallet"},
        ]}>
      
        <SidePanelWithContainer 
            header="Composition" 
            sidePanel = {<BarChart bars={bars}/>}>
                <ValueBar usdBalance={usdBalance} portfolioValue={portfolioValue}/>
                <LineChart data={initialData}></LineChart>
        </SidePanelWithContainer>
          
        <Table style={{marginTop:'1vh'}} emptyMessage="No Assets to show">
            <TableRow data={[
                'Coin', 
                'Trading Balance', 
                'Funding Balance', 
                'Total Balance', 
                'market Price',
                'Value'
            ]}/>

             
            { assets && assets.map(asset => (
                <TableRow 
                    key={asset.symbol} 
                    data={[
                      [ asset.symbol ], 
                      asset.tradingBalance, 
                      asset.fundingBalance, 
                      asset.totalBalance, 
                      asset.marketPrice,
                      `$ ${asset.value.toFixed(2)}`
                    ]} 
                />
            ))}
        </Table> 
    </BasicPage>
  )
}
