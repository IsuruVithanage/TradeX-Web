import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import LineChart from '../../Components/Charts/LineChart/LineChar';
import BarChart from '../../Components/Charts/BarChart/BarChart';
const initialData = require('./portfolio-data.json');

export default function Portfolio() {
  const bars = [
      { symbol: 'BTC', presentage: 10 },
      { symbol: 'ETH', presentage: 15 },
      { symbol: 'DOGE', presentage: 20 },
      { symbol: 'ADA', presentage: 25 },
      { symbol: 'BNB', presentage: 27 },
      { symbol: 'XRP', presentage: 3 },

  ];

  const Tabs = [
    { label:"Portfolio", path:"/portfolio"},
    { label:"History", path:"/portfolio/history"},
    { label:"Home", path:"/"},
  ];

  return (
    <BasicPage tabs={Tabs}>
      
        <SidePanelWithContainer 
          header="Composition" 
          sidePanel = {<BarChart bars={bars}/>}>
          
            <h1>Portfolio</h1>
            <LineChart data={initialData}></LineChart>
        </SidePanelWithContainer>

            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            <p>This is Home page content</p>
            
    </BasicPage>
  )
}
