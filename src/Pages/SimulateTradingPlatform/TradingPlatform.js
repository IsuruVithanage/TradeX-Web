import React, {useEffect, useState} from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import './TradingPlatForm.css'
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import Input from "../../Components/Input/Input";
import SliderInput from "../../Components/Input/SliderInput/SliderInput";
import Table, {TableRow} from "../../Components/Table/Table";
import assets from "./assets.json";
import {useSelector} from "react-redux";

export default function TradingPlatform() {
    const user= useSelector(state => state.user);

    const Tabs = [
        {label: "Spot", path: "/simulate"},
        {label: "Quiz", path: "/quiz"},
    ];

    const [orderType, setOrderType] = useState('Buy');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [latestPrice, setLatestPrice] = useState(0);


    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleCoinSelection = (coin) => {
        setSelectedCoin(coin);
    };

    const updateLastPrice = (newValue) => {
        setLatestPrice(newValue);
    };

    useEffect(() => {
        console.log(latestPrice);
        console.log(user);
    }, [latestPrice]);


    const handlePriceChange = (value) => {
        setPrice(value);
        if (quantity !== 0) {
            setTotal(value * quantity);
        }
    };

    const handleQuantityChange = (value) => {
        setQuantity(value);
        setTotal(price * value);
    };

    const setMarketPrice = () => {
        setPrice(latestPrice);
        setTotal(latestPrice * quantity);
    }

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{paddingTop: "22px"}}
                sidePanel={
                    <div>
                        <h1 className="tradeHeader">Trade</h1>
                        <ButtonSet priceLimits={priceLimits} setMarketPrice={setMarketPrice}/>
                        <Input type={"switch"} buttons={["Buy", "Sell"]} onClick={setOrderType}/>

                        <Input label={'Price'} type={'number'} icon={"$"} value={price} onChange={handlePriceChange}/>
                        <Input label={'Quantity'} type={'number'} value={quantity}
                               icon={selectedCoin?.symbol ? selectedCoin.symbol.toUpperCase() : ""}
                               onChange={handleQuantityChange}/>
                        <SliderInput/>

                        <Input label={'Total'} type={"text"} placehalder={"Total"} value={total}/>

                        <Input type="button" value={orderType} style={{marginTop: '0.7rem'}}/>

                    </div>
                }
            >

                <CoinBar onSelectCoin={handleCoinSelection} enableModel={true}/>
                <TradingChart selectedCoin={selectedCoin} updateLastPrice={updateLastPrice}/>
            </SidePanelWithContainer>

            <Table style={{marginTop: '1vh'}}>
                <TableRow data={[
                    'Coin',
                    'Spot Balance',
                    'Funding Balance',
                    'Total Balance',
                    'market Price',
                    'Value'
                ]}/>


                {assets && Object.keys(assets).slice(1).map(coin => (
                    <TableRow
                        key={coin}
                        data={[
                            [coin],
                            assets[coin].spotBalance,
                            assets[coin].fundingBalance,
                            assets[coin].TotalBalance,
                            assets[coin].marketPrice,
                            assets[coin].value,
                            <Input type="button" value="Cancel" style={{width: "90px"}} outlined/>
                        ]}
                    />
                ))}
            </Table>
        </BasicPage>
    )
}
