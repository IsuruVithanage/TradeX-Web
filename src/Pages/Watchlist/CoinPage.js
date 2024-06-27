import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import coinList from "../../Assets/Images/Coin Images.json";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import axios from "axios";
import Converter from "../../Components/Converter/Converter";
import CoinDescription from "../../Assets/Images/Coin Description.json";
import "./CoinPage.css";


export default function Suggestions() {
    const pageSymbol = useParams().symbol;
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [coinData, setCoinData] = useState({
        name: '',
        price: 0,
        symbol: '',
        marketcap: 0,
        volume: 0,
        image: '',
        priceChange: 0,
    });

    const Tabs = [
        { label: "All", path: "/watchlist" },
        { label: "Custom", path: "/watchlist/customize" },
    ];
 

    useEffect(() => {
        fetchChartData();
        loadCoinData();
    }, []);



    const fetchChartData = async () => {
        try {
            setIsLoading(true);

            const min = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${pageSymbol}USDT&interval=1m&limit=180`
            );

            const hour = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${pageSymbol}USDT&interval=1h&limit=720`
            );

            const day = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${pageSymbol}USDT&interval=1d&limit=365`
            );


            const minData = min.data.map((item) => ({
                time: (item[0] / 1000),
                value: parseFloat(item[4]),
            }));

            const hourData = hour.data.map((item) => ({
                time: (item[0] / 1000),
                value: parseFloat(item[4]),
            }));

            const dayData = day.data.map((item) => ({
                time: (item[0] / 1000),
                value: parseFloat(item[4]),
            }));

            const result = {
                '1M': {
                    showTime: true,
                    data: minData
                },

                '1H': {
                    showTime: true,
                    data: hourData
                },

                '1D': {
                    showTime: false,
                    data: dayData
                }
            };

            setChartData(result);
            setIsLoading(false);
        } 
        
        catch (error) {
            console.log('Error fetching data:', error);
            setIsLoading(false);
        }
    };



    function loadCoinData() { 
        setIsLoading(true);

        const formatCurrency = (amount) => {
            const amountString = amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 20
            });
            return '$ ' + amountString;
        };


        const name = coinList[pageSymbol].name;

        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${name.toLowerCase()}`
            )
            .then(async res => {
                setCoinData((prevData) => ({
                    ...prevData,
                    name: res.data.name,
                    price: formatCurrency(res.data.market_data.current_price.usd),
                    symbol: res.data.symbol,
                    image: res.data.image.large,
                    priceChange: res.data.market_data.price_change_24h,
                    marketcap: res.data.market_data.market_cap.usd,
                }));
                setIsLoading(false);
            })

            .catch(error => {
                console.log(error)
                setIsLoading(false);
            });
    }

    return (
        <BasicPage tabs={Tabs} isLoading={isLoading}>
            <SidePanelWithContainer
                header="Crypto Converter"
                sidePanel={<Converter symbol={pageSymbol}/>}
                style={{height: '91vh'}}
            >

                <div className='coinDiv'>
                    <div className='coin-logo'>
                        <div className='coin-logo coinimg'>
                            <img src={coinData.image} alt=""/>
                            <p>{coinData.name}</p>
                        </div>
                    </div>
                    <div className='coinData'>
                        <div className='cdata'>
                            <h1>Price</h1>
                            <p>{coinData.price}</p>
                        </div>
                        <div className='cdata'>
                            <h1>24h Price Change</h1>
                            <p style={{color: coinData.priceChange > 0 ? "#21DB9A" : "#FF0000"}}>{coinData.priceChange} %</p>
                        </div>
                        <div className='cdata'>
                            <h1>Market Cap</h1>
                            <p>{coinData.marketcap}</p>
                        </div>
                    </div>
                </div>
            
                <div className="coinDiv coinDescription" >
                    <div>{isLoading ? "Loading..." : CoinDescription[pageSymbol].description}</div>
                </div>
                
                <LineChart data={chartData} zoom={true} title={coinList[pageSymbol].name} ></LineChart>
            </SidePanelWithContainer>

        </BasicPage>
    )


}
