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
  let totalValue = 0;

  const Tabs = [
    { label:"Portfolio", path:"/portfolio"},
    { label:"History", path:"/portfolio/history"},
    { label:"Home", path:"/"},
  ];

  Object.values(assets).forEach(asset => {
    asset.TotalBalance = asset.spotBalance + asset.futureBalance + asset.fundingBalance;
    asset.Value = asset.TotalBalance * asset.marketPrice;
    totalValue += asset.Value;
  });
 
  const bars = Object.keys(assets).map(assetKey => ({
    coinName: assetKey,
    percentage: ((assets[assetKey].Value / totalValue) * 100),
  }));

  return (
    <BasicPage tabs={Tabs}>
      
        <SidePanelWithContainer 
          header="Composition" 
          sidePanel = {<BarChart bars={bars}/>}>
          
            <ValueBar usd={100000} value={100000}/>
            <LineChart data={initialData}></LineChart>
        </SidePanelWithContainer>
          
            <div style={{marginTop:'1vh'}}>
              <Table>
                  <TableRaw data={['Coin', 'Spot Balance', 'Future Balance', 'Funding Balance', 'Total Balance', 'Value']}/>

                  {Object.keys(assets).map(assetKey => (
                    <TableRaw 
                      key={assetKey} 
                      data={[
                        [assets[assetKey].symbol, assetKey], 
                        assets[assetKey].spotBalance, 
                        assets[assetKey].futureBalance, 
                        assets[assetKey].fundingBalance, 
                        assets[assetKey].TotalBalance, 
                        assets[assetKey].Value
                      ]} 
                    />
                  ))}
              </Table>
            </div>
          
    </BasicPage>
  )
}
