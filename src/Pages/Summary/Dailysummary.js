import React from 'react'
import './dailysummary.css'
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from "../../Components/Input/Input";
import Switch from '@mui/material/Switch';
import { Box } from '@mui/system';


function Dailysummary() {
    const Tabs = [
        { label: "Daily", path: "/" },
        { label: "Monthly", path: "Dailysummary/Monthlysummary" },
       
        
      ];
      
      const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <BasicPage tabs={Tabs}>
    
    
    <div className='heading'>Generate Daily Summary</div>
    <div className='page-content'>        
    <div className='left-side'>
          <div className='add-items'>
              <div className='add-coins'>
                  <h3>Add Coins</h3>
                  <div className='search-bar'>
                      <Input type="search" placeholder="Search" style={{width:"400px" }}/>
                      <Input type="button" value="Add" className="add-button" style={{width:"70px",marginLeft:"50%" }}/>
                  </div>
                <div className='chart-table'>
                      <div className='data'>
                      <Input type="toggle" id='' toggleLabel="Top Gains"/>
                      </div>  

                      <div className='data'>
                      <Input type="toggle" id='' toggleLabel="Top Losses"/>
                      </div> 

                      <div className='data'>
                      <Input type="toggle" id='' toggleLabel="Trending Coin"/>
                      </div>

                      <div className='data'>
                      <Input type="toggle" id='' toggleLabel="Trading History"/>
                      </div>

                      <div className='data'>
                      <Input type="toggle" id='' toggleLabel="Trading Suggestion Table"/>
                      </div>

                      
                  </div>

    
              </div>
              
              <div className='default'>
              <Input type="toggle" id='' toggleLabel="Set this features as default"/>
              </div>

              <div className='box-container'>
                

              </div>
          </div>
      </div>

    
      <div className='right-side'>
          <div className='template'></div>
          <div className='buttons'>
            <Input type="button" value="Generate" className="generate-button" style={{width:"87px" }}/>
            <Input type="button" value="Download" className="download-button" style={{width:"87px" , marginLeft:"28%" }}/>
          </div>
      </div>
    </div>
    
    

</BasicPage>
  )
}

export default Dailysummary
