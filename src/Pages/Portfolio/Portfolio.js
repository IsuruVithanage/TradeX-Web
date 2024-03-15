import React, { useState, useEffect } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import LineChart from '../../Components/Charts/LineChart/LineChar';
import BarChart from '../../Components/Charts/BarChart/BarChart';
import ValueBar from '../../Components/ValueBar/ValueBar';
import Table, { TableRow } from '../../Components/Table/Table';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function Portfolio() {
  const [ assets, setAssets ] = useState([]);
  const [ usdBalance, setUsdBalance ] = useState(null);
  const [ portfolioValue, setPortfolioValue ] = useState(null);
  const [ percentages, setPercentages ] = useState([]);
  const [ initialData, setInitialData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const backendApiEndpoint = 'http://localhost:8004/portfolio/asset/overview';
  const userId = 1;
  

  useEffect(() => {
    setIsLoading(true);
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
            setAssets(res.data.assets);
            setPercentages(res.data.percentages);
            setInitialData(res.data.historyData);
            setPortfolioValue(res.data.portfolioValue);
            setUsdBalance(res.data.usdBalance);
            setIsLoading(false);
        })

        .catch(error => {
            setIsLoading(false);
            setPortfolioValue(0);
            setUsdBalance(0);
            error.response ? alert(error.message + "\n" + error.response.data.message) :
            alert(error.message + "! \nBackend server is not running or not reachable.\nPlease start the backend server and refresh the page.");
            console.log("error", error);
        });

  }, []);


  return (
    <BasicPage 
        tabs={[
          { label:"Overview", path:"/portfolio"},
          { label:"History", path:"/portfolio/history"},
          { label:"Trading Wallet", path:"/portfolio/tradingWallet"},
          { label:"Funding Wallet", path:"/portfolio/fundingWallet"},
        ]}>

        { isLoading && <Loading/>}
      
        <SidePanelWithContainer 
            style={{height:'75vh'}}
            header="Composition" 
            sidePanel = { <BarChart bars={ percentages }/> }>
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
