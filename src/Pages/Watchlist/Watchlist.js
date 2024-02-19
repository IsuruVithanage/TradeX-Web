import React, {useState, useEffect} from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import axios from 'axios';
import Input from '../../Components/Input/Input';
import './Watchlist.css';
import { display } from '@mui/system';


const Watchlist1 = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
            )
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const formatCurrency = (amount) => {
        const amountString = amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 20 
        });
        return '$ ' + amountString;
    };
    

    const handleChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <BasicPage
            tabs={[
                { label:"All", path:"/Watchlist"},
                { label:"Custom", path:"/watchlist/customize"},
                { label:"Coin page", path:"/watchlist/CoinPage"},
            ]}>
            <div className="mainbanner" style={{ display: 'flex' }}>
            <div className='banner'>Top coins</div>
            <div className='banner'>Top coins</div>
            <div className='banner'>Top coins</div>
            <div className='banner'>Top coins</div>
            </div>
            <div className='watchlist-table-container'>
                <Input type='search' placeholder='Search' style={{width:"300px"}} onChange={handleChange}/>

                <table className='watchlist-table'>
                    <thead>
                        <tr>
                            <td colSpan={2}>Coin</td>
                            <td>Price</td>
                            <td>24h Change</td>
                            <td>Market Cap</td>
                        </tr>

                    </thead>
                    <tbody>
                    { filteredCoins.map(coin => {
                        const price = formatCurrency(coin.current_price);
                        const mktCap = formatCurrency(coin.market_cap);
                        return(
                        <tr key={coin.id}>
                            <td style={{width:"40px"}}>
                                <img className='coin-image' src={coin.image} alt={coin.symbol}/>
                            </td>
                            <td style={{width:"150px"}}>
                                <div className='coin-name-container'>
                                    <span className='coin-name'>{coin.name}</span>
                                    <span className='coin-symbol'>{coin.symbol}</span>
                                </div> 
                            </td>
                            <td>{price}</td>
                            <td style={{color: coin.price_change_percentage_24h > 0 ? "#21DB9A" : "#FF0000"}}>{coin.price_change_percentage_24h} %</td>
                            <td>{mktCap}</td>
                        </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>
        </BasicPage>
    );
}

export default Watchlist1;
