import React from 'react'
import './dailysummary.css'
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from "../../Components/Input/Input";
import Switch from '@mui/material/Switch';

function Dailysummary() {
    const Tabs = [
        { label: "Daily", path: "/" },
        { label: "Monthly", path: "/" },
       
        
      ];

      const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <BasicPage tabs={Tabs}>
    
    <div className='page-content'>
        <div className='heading'>Generate Daily Summary</div>
        <div className='add-items'>
            <div className='add-coins'>
                <h3>Add Coins</h3>
                <div className='search-bar'>
                    <Input type="search" placeholder="Search" style={{width:"400px" }}/>
                    <Input type="button" value="Add" className="add-button" style={{width:"70px",marginLeft:"50%" }}/>
                </div>
               <div className='chart-table'>
                    <div className='data'>
                      <p>Top Gains</p>
                      <Switch {...label} defaultChecked style={{}} />
                    </div>  

                    <div className='data'>
                      <p>Top Losses</p>
                      <Switch {...label} defaultChecked />
                    </div> 

                    <div className='data'>
                      <p>Trending coin</p>
                      <Switch {...label} defaultChecked />
                    </div>

                    <div className='data'>
                      <p>Trading History</p>
                      <Switch {...label} defaultChecked />
                    </div>

                    <div className='data'>
                      <p>Trading Suggestion Table</p>
                      <Switch {...label} defaultChecked />
                    </div>

                    
                </div>

  
            </div>
            
            <div className='default'>
               <p>Set this features as default</p>
               <Switch {...label} defaultChecked />
            </div>

            <div className='box-container'>

            </div>
        </div>

    </div>
    
    

</BasicPage>
  )
}

export default Dailysummary
