import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import LineChart from '../../Components/Charts/LineChart/LineChar';
import BarChart from '../../Components/Charts/BarChart/BarChart';
import ValueBar from '../../Components/ValueBar/ValueBar';
import Table, { TableRaw } from '../../Components/Table/Table';

export default function Portfolio() {
  const initialData = require('./portfolio-data.json');
  const assets = require('./assets.json');
  const usdBalance = assets.USD.spotBalance + assets.USD.fundingBalance;
  let portfolioValue = 0;

  Object.values(assets).forEach(asset => {
    asset.TotalBalance = asset.spotBalance + asset.fundingBalance;
    asset.value = asset.TotalBalance * asset.marketPrice;
    portfolioValue += asset.value;
  });
 
  const bars = Object.keys(assets).map(assetKey => ({
    coinName: assetKey,
    percentage: ((assets[assetKey].value / portfolioValue) * 100),
  }));

  return (
    <BasicPage 
        tabs={[
          { label:"Overview", path:"/portfolio"},
          { label:"History", path:"/portfolio/history"},
          { label:"Trading Wallet", path:"/portfolio/wallet?tradingWallet"},
          { label:"Funding Wallet", path:"/portfolio/wallet?fundingWallet"},
        ]}>
      
        <SidePanelWithContainer 
            header="Portfolio Composition" 
            sidePanel = {<BarChart bars={bars}/>}>
                <ValueBar usdBalance={usdBalance} portfolioValue={portfolioValue}/>
                <LineChart data={initialData}></LineChart>
        </SidePanelWithContainer>
          
        <Table style={{marginTop:'1vh'}}>
            <TableRaw data={[
                'Coin', 
                'Spot Balance', 
                'Funding Balance', 
                'Total Balance', 
                'market Price',
                'Value'
            ]}/>

             
            { assets && Object.keys(assets).slice(1).map(coin => (
                <TableRaw 
                    key={coin} 
                    data={[
                      [ coin ], 
                      assets[coin].spotBalance, 
                      assets[coin].fundingBalance, 
                      assets[coin].TotalBalance, 
                      assets[coin].marketPrice, 
                      assets[coin].value
                    ]} 
                />
            ))}
        </Table> 
    </BasicPage>
  )
}
