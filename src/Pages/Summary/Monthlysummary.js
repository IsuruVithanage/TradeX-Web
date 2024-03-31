import React from 'react'
import './Monthlysummary.css'
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from "../../Components/Input/Input";
import Switch from '@mui/material/Switch';
import { Box } from '@mui/system';


function Dailysummary() {
    const Tabs = [
        { label: "Daily", path: "/Dailysummary" },
        { label: "Monthly", path: "Dailysummary/Monthlysummary" },
       
        
      ];
      
      const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <BasicPage tabs={Tabs}>
    
    
    <div className='heading'>Generate Monthly Summary</div>
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
                        <div className='tog-name'>
                            <span>Top Gain</span>
                        </div>
                        <div className='tog1'>
                         <Input type="toggle" id=''/>
                        </div>
                      
                      </div>  

                      <div className='data'>
                        <div className='tog-name'>
                            <span>Top Losses</span>
                        </div>
                        <div className='tog2'>
                         <Input type="toggle" id=''/>
                        </div>
                      </div>  

                      <div className='data'>
                        <div className='tog-name'>
                            <span>Trending Coin</span>
                        </div>
                        <div className='tog3'>
                         <Input type="toggle" id=''/>
                        </div>
                      </div> 
                     
                      <div className='data'>
                        <div className='tog-name'>
                            <span>Trading History</span>
                        </div>
                        <div className='tog4'>
                         <Input type="toggle" id=''/>
                        </div>
                      </div> 
                  
                      <div className='data'>
                        <div className='tog-name'>
                            <span>Trading Suggestion History</span>
                        </div>
                        <div className='tog5'>
                         <Input type="toggle" id='' />
                        </div>
                      </div>  
                  </div>

    
              </div>
              
              <div className='default'>
                <div className="defaultname">
                    <span>Set this features as default</span>
                <div className="tog6">
                    <Input type="toggle" id=''/>
                </div>
                   
              </div>
               
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
