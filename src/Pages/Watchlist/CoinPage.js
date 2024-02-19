import React from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import './CoinPage.css';
import Input from '../../Components/Input/Input';

export default function CoinPage() {
  return (
    <div>
      <BasicPage
        tabs={[
          { label: "All", path: "/watchlist" },
          { label: "Custom", path: "/watchlist/customize" },
          { label: "Coin page", path: "/watchlist/CoinPage" }, 
        ]}
      >
        <div style={{ display: 'flex' }}><div className='Info'><h3>BTC / USD</h3><h4>About</h4><p>Lorem Ipsum is simply dummy text of the
             printing and typesetting industry. 
            Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of 
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>
        <div className='convertor'><h4>Bitcoin Converter</h4>
        <Input type= "Text" className="Input" placeholder="BTC"></Input>
        <Input type= "Text" className="Input" placeholder="USD"></Input>
        <Input type="button"value="Convert" style={{width:"150px", marginTop:"23px", marginLeft:"85px"}}/>
        </div></div>
        <div style={{ display: 'flex' }}><div className='graph'>Graph</div>
        <div className='price-stat'><h4>BTC Price Statistics</h4>
        <div style={{ display: 'flex' }}><div><p>Price<br/>
        24h Low / 24h High<br/>
        7d Low / 7d High<br/>
        Trading Volume<br/>
        Market Cap<br/>
        Balance</p></div>
        <div className='Stat'><p>21,653.33 USD<br/>
        21,653.33 USD<br/>
        21,653.33 USD<br/>
        21,653.33 USD<br/>
        21,653.33 USD<br/>
        21,653.33 USD</p>
        </div></div></div></div>
      </BasicPage>
    </div>
  );
}
