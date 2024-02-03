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
  const usdBalance = assets.USD.spotBalance + assets.USD.futureBalance + assets.USD.fundingBalance;
  let portfolioValue = 0;

  const Tabs = [
    { label:"Portfolio", path:"/portfolio"},
    { label:"History", path:"/portfolio/history"},
    { label:"Home", path:"/"},
  ];

  Object.values(assets).forEach(asset => {
    asset.TotalBalance = asset.spotBalance + asset.futureBalance + asset.fundingBalance;
    asset.value = asset.TotalBalance * asset.marketPrice;
    portfolioValue += asset.value;
  });
 
  const bars = Object.keys(assets).map(assetKey => ({
    coinName: assetKey,
    percentage: ((assets[assetKey].value / portfolioValue) * 100),
  }));

  return (
    <BasicPage tabs={Tabs}>
      
        <SidePanelWithContainer 
          header="Composition" 
          sidePanel = {<BarChart bars={bars}/>}>
            <ValueBar usdBalance={usdBalance} portfolioValue={portfolioValue}/>
            <LineChart data={initialData}></LineChart>
        </SidePanelWithContainer>
          
        <Table style={{marginTop:'1vh'}}>
            <TableRaw data={[
                'Coin', 
                'Spot Balance', 
                'Future Balance', 
                'Funding Balance', 
                'Total Balance', 
                'Value'
            ]}/>

            { Object.keys(assets).slice(1).map(assetKey => (
                <TableRaw 
                    key={assetKey} 
                    data={[
                      [assets[assetKey].symbol, assetKey], 
                      assets[assetKey].spotBalance, 
                      assets[assetKey].futureBalance, 
                      assets[assetKey].fundingBalance, 
                      assets[assetKey].TotalBalance, 
                      assets[assetKey].value
                    ]} 
                />
            ))}
        </Table> 
    </BasicPage>
  )
}
