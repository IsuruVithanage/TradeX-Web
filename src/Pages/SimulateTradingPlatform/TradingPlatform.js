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
    const user = useSelector(state => state.user);

    const Tabs = [
        {label: "Spot", path: "/simulate"},
        {label: "Quiz", path: "/quiz"},
    ];

    const [latestPrice, setLatestPrice] = useState(0);
    const [isOrderSet, setIsOrderSet] = useState(true);
    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const [order, setOrder] = useState({
        userId: user.id,
        type: 'Buy',
        cato: 'Limit',
        coin: null,
        price: 0,
        quantity: 1,
        total: 0,
    });

    const handleCoinSelection = (coin) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            coin: coin
        }));
    };

    const setOrderCatagory = (value) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            cato: value
        }));
        console.log(order.cato)
        if (value === 'Market') {
            setMarketPrice();
        } else if (value === 'Limit') {
            setOrder(prevOrder => ({
                ...prevOrder,
                price: 0,
                total: 0
            }));
        } else if (value === 'Stop Limit') {
            setOrder(prevOrder => ({
                ...prevOrder,
                price: 0,
                total: 0
            }));
        }
    };

    const updateLastPrice = (newValue) => {
        setLatestPrice(newValue);
    };

    useEffect(() => {
        if (order.cato === 'Market') {
            handlePriceChange(latestPrice);
        }
    }, [order.cato, latestPrice]);


    const handlePriceChange = (value) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            price: value
        }));
        if (order.quantity !== 0) {
            setOrder(prevOrder => ({
                ...prevOrder,
                total: value * order.quantity
            }));
        }
    };

    const handleQuantityChange = (value) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            quantity: value
        }));
        setOrder(prevOrder => ({
            ...prevOrder,
            total: value * order.price
        }));
    };

    const setMarketPrice = () => {
        setOrder(prevOrder => ({
            ...prevOrder,
            price: latestPrice
        }));
        setOrder(prevOrder => ({
            ...prevOrder,
            total: latestPrice * order.quantity
        }));

        if (isOrderSet) {
            setIsOrderSet(false);
        }

    }

    const setOrderType = (type) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            type: type
        }));
    }


    const saveOrder = async () => {
        try {
            const response = await fetch('http://localhost:8007/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            return await response.json();
        } catch (error) {
            console.error('Failed to save order:', error);
        }
    }


    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{paddingTop: "22px"}}
                sidePanel={
                    <div>
                        <h1 className="tradeHeader">Trade</h1>
                        <ButtonSet priceLimits={priceLimits} setOrderCatagory={setOrderCatagory}/>
                        <Input type={"switch"} buttons={["Buy", "Sell"]} onClick={setOrderType}/>

                        <Input label={'Price'} type={'number'} icon={"$"} value={order.price} onChange={handlePriceChange}/>
                        <Input label={'Quantity'} type={'number'} value={order.quantity}
                               icon={order.coin?.symbol ? order.coin.symbol.toUpperCase() : ""}
                               onChange={handleQuantityChange}/>
                        <SliderInput/>

                        <Input label={'Total'} type={"number"} icon={"$"} placehalder={"Total"} value={order.total}/>

                        <Input type="button" value={order.type} style={{marginTop: '0.7rem'}} disabled={isOrderSet}
                               onClick={saveOrder}/>

                    </div>
                }
            >

                <CoinBar onSelectCoin={handleCoinSelection} enableModel={true}/>
                <TradingChart selectedCoin={order.coin} updateLastPrice={updateLastPrice}/>
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
