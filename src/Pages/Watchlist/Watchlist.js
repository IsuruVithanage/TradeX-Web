import React, {useState, useEffect} from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import axios from 'axios';
import './Watchlist.css';
import Coin from "../../Components/coin/coin";


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

    const handleChange = e => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <BasicPage>
            <div className='coin-app'>
                <div className='coin-search'>
                </div>
                {filteredCoins.map(coin => {
                    return (
                        <Coin
                            key={coin.id}
                            name={coin.name}
                            price={coin.current_price}
                            symbol={coin.symbol}
                            marketcap={coin.total_volume}
                            volume={coin.market_cap}
                            image={coin.image}
                            priceChange={coin.price_change_percentage_24h}
                        />
                    );
                })}
            </div>
        </BasicPage>
    );
}

export default Watchlist1;
