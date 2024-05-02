import React from 'react'
import './dailysummary.css'
import BasicPage from '../../Components/BasicPage/BasicPage';
import Input from "../../Components/Input/Input";
import Switch from '@mui/material/Switch';
import { Box } from '@mui/system';
import Modal from 'antd/es/modal/Modal';
import { useState } from 'react';
import {useEffect} from 'react';


function Dailysummary() {
  // create the tabs
    const Tabs = [
        { label: "Daily", path: "/Summary/Dailysummary" },
        { label: "Monthly", path: "Dailysummary/Monthlysummary" },
       
        
      ];
     // imported 
      const label = { inputProps: { 'aria-label': 'Switch demo' } };

      const [coins, setCoins] = useState([]);
      const [search, setSearch] = useState("");
     const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);


     const formatCurrency = (amount) => {
      const amountString = amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 20,
      });
      return "$ " + amountString;
    };

    const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
     //
  return (
    // daily summary front end
    <BasicPage tabs={Tabs}>
    
    <div className='heading'>Generate Daily Summary</div>
    <div className='page-content'>        
    <div className='left-side'>
          <div className='add-items'>
              <div className='add-coins'>
                <Input
            type="search"
            placeholder="Search"
            style={{ width: "300px", float: "right", marginRight: "50px" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <Input
              type="button"
              value="Add Coin"
              outlined
              green
              style={{ width: "150px" }}
              onClick={() => (true)}
            />
            <Modal open={isdeleteModalOpen} close={setIsdeleteModalOpen}>
              <div style={{ width: "450px" }}>
                <h2>Select Coin</h2>
                <div>
                  <Input
                    type="search"
                    placeholder="Search"
                    style={{
                      width: "400px",
                      float: "right",
                      marginRight: "50px",
                    }}
                    onChange={setSearch}
                  />
                </div>

                <table className="watchlist-table-modal">
                  <thead
                    style={{
                      color: "#dbdbdb",
                      fontSize: "18px",
                      marginBottom: "20px",
                    }}
                  >
                    <tr>
                      <td>Coin</td>
                      <td>Price</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoins.map((coin) => (
                      <tr key={coin.id}>
                        <td
                          style={{ marginLeft: "100px", marginBottom: "50px" }}
                        >
                          <img
                            className="coin-image-add"
                            src={coin.image}
                            alt={coin.symbol}
                          />
                          <span className="coin-symbol-add">
                            {coin.symbol.toUpperCase()}
                          </span>
                        </td>

                        <td className="coin-price-add">
                          {formatCurrency(coin.current_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal>
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
                </div>
                <div className="tog6">
                      <Input type="toggle" id=''/>
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
