import React, {useEffect, useState} from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import './TradingPlatForm.css'
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import Input from "../../Components/Input/Input";
import SliderInput from "../../Components/Input/SliderInput/SliderInput";
import Table, {TableRow, Coin} from "../../Components/Table/Table";
import assets from "./assets.json";
import {useSelector} from "react-redux";
import {showMessage} from "../../Components/Message/Message";
import CancelButton from "../../Components/Input/Button/CencelButton";

export default function TradingPlatform() {
    const user = useSelector(state => state.user);

    const Tabs = [
        {label: "Spot", path: "/simulate"},
        {label: "Quiz", path: "/quiz"},
    ];

    const [latestPrice, setLatestPrice] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const [balancePr, setBalancePr] = useState(0);
    const [limitOrder, setLimitOrder] = useState([]);
    const [isButtonSet, setIsButtonSet] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isError, setIsError] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const [order, setOrder] = useState({
        userId: user.id,
        type: 'Buy',
        date: '',
        cato: 'Limit',
        coin: null,
        price: 0,
        quantity: 0,
        total: 0,
        orderStatus: ''
    });

    useEffect(() => {
        // Load state from localStorage when component mounts
        const savedState = localStorage.getItem('tradingPlatformState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setOrder(parsedState.order);
            setLimitOrder(parsedState.limitOrder);
            handleCoinSelection(parsedState.selectedCoin);
            setOrderCatagory(parsedState.selectedType);
            setSelectedType(parsedState.selectedType);
            // Set other states as needed...
        } else {
            // If no saved state found, initialize with default values
            setOrder({
                userId: user.id,
                type: 'Buy',
                date: '',
                cato: 'Limit',
                coin: null,
                price: 0,
                quantity: 0,
                total: 0,
                orderStatus: ''
            });
            setLimitOrder([]);
            // Initialize other states with default values...
        }
    }, []);


    useEffect(() => {
        const stateToSave = {
            order,
            limitOrder,
            selectedCoin,
            selectedType
        };
        localStorage.setItem('tradingPlatformState', JSON.stringify(stateToSave));
    }, [order, limitOrder]);

    const handleCoinSelection = (coin) => {
        if (coin) {
            setOrder(prevOrder => ({
                ...prevOrder,
                coin: coin
            }));
            setSelectedCoin(coin);
            fetchLimitOrders(coin.symbol.toUpperCase());
        }
    };

    const fetchLimitOrders = (coin) => {
        fetch(`http://localhost:8005/order/getLimitOrderByCoin/${coin}/${user.user.id}`)
            .then(response => response.json())
            .then(data => {
                setLimitOrder(data);
            })
            .catch(error => {
                console.error('Failed to fetch limit orders:', error);
            });
    };

    const getWalletBalance = () => {
        fetch(`http://localhost:8011/portfolio/asset/1/USD`)
            .then(response => response.json())
            .then(data => {
                setWalletBalance(data[0].balance);
            })
            .catch(error => {
                console.error('Failed to get wallet balance:', error);
            });
    }

    useEffect(() => {
        getWalletBalance();
    }, []);

    //place order
    const placeOrder = () => {
        const currentDate = new Date().toISOString();
        console.log(currentDate);
        return {
            userId: user.user.id,
            coin: order.coin.symbol.toUpperCase(),
            quantity: order.quantity,
            date: currentDate,
            price: order.price,
            type: order.cato,
            totalPrice: order.total,
            orderStatus: order.cato === 'Market' ? 'Completed' : 'Pending'
        }
    }

    /*useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:443/ws/btcusdt@kline_1s');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const candlestickData = {
                openTime: (data.k.t)/1000,
                open: parseFloat(data.k.o),
                high: parseFloat(data.k.h),
                low: parseFloat(data.k.l),
                close: parseFloat(data.k.c),
            };
            console.log(candlestickData);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        return () => {
            ws.close();
        };
    }, []);*/


    const setOrderCatagory = (value) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            cato: value
        }));
        console.log(order.cato)
        if (value === 'Market') {
            setIsButtonSet(true);
            setSelectedType('Market');
            setMarketPrice();
            setIsDisabled(true);
        } else if (value === 'Limit') {
            setOrder(prevOrder => ({
                ...prevOrder,
                price: 0,
                total: 0
            }));
            setIsButtonSet(true);
            setSelectedType('Limit');
            setIsDisabled(false);
        } else if (value === 'Stop Limit') {
            setOrder(prevOrder => ({
                ...prevOrder,
                price: 0,
                total: 0
            }));
            setIsButtonSet(true);
            setSelectedType('Stop Limit');
            setIsDisabled(false);
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
        console.log(value)
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
        if (value <= 0.0) {
            setIsError('Quantity should be greater than 0');
            setIsButtonSet(true);
        } else {
            setIsError(null);
            setOrder(prevOrder => ({
                ...prevOrder,
                quantity: value
            }));
            setOrder(prevOrder => ({
                ...prevOrder,
                total: value * order.price
            }));

            setIsButtonSet(false);
        }

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

    }

    const setOrderType = (type) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            type: type
        }));
    }

    const saveOrder = () => {
        if (walletBalance < order.total) {
            showMessage('Error', 'Wallet balance is insufficient!');
            return;
        }

        const ob = {
            userId: user.user.id,
            coin: order.coin ? order.coin.symbol.toUpperCase() : null,
            quantity: order.quantity,
            purchasePrice: order.price,
            type: order.cato
        }

        if (!ob.userId || !ob.coin || !ob.quantity || !ob.purchasePrice) {
            console.error('Invalid order:', ob);
            return;
        }

        if (ob.quantity < 0) {
            showMessage('Error', 'Please enter the quantity!');
            return;
        }

        setIsLoading(false);


        fetch('http://localhost:8011/portfolio/asset/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ob)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                return fetch('http://localhost:8005/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(placeOrder())
                });
            })
            .then(response => {
                if (response.ok) {
                    setIsLoading(true);
                    showMessage('success', 'The order has been placed successfully!');
                    getWalletBalance();
                    fetchLimitOrders(selectedCoin.symbol);
                } else {
                    console.error('Failed to save order:', response);
                }
            })
            .catch(error => {
                console.error('Failed to save order:', error);
            });
    }

    useEffect(() => {
        if (order.total > walletBalance) {
            setIsButtonSet(true);
            setIsError('Wallet balance is insufficient!');
        }
    }, [order.total]);

    useEffect(() => {
        console.log(balancePr);
        const value = (walletBalance * (balancePr/100));
        console.log('value', value);
        const quantity = value / order.price;
        if (balancePr !== 0)  {
            setIsError(null);
            setOrder(prevOrder => ({
                ...prevOrder,
                quantity: quantity
            }));
            setOrder(prevOrder => ({
                ...prevOrder,
                total: quantity * order.price
            }));

            setIsButtonSet(false);
        }
    }, [balancePr]);


    const formatPrice = (price) => {
        return "$ " + price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };


    const confirm = (orderId) => {
        fetch(`http://localhost:8005/order/deleteOrder/${orderId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    showMessage('Success', 'Order deleted successfully');
                    fetchLimitOrders(selectedCoin.symbol);
                } else {
                    showMessage('Error', 'Failed to delete order');
                }
            })
            .catch(error => {
                console.error('Error deleting order:', error);
                showMessage('Error', 'Internal server error');
            });
    };

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{paddingTop: "22px"}}
                sidePanel={
                    <div>
                        <div style={{display:'flex'}}>
                            <h1 className="tradeHeader" style={{marginRight:'5.3rem'}}>Trade</h1>
                            <h1 className="tradeHeader" style={{color:'#21db9a'}}>${walletBalance.toLocaleString()}</h1>
                        </div>
                        <ButtonSet priceLimits={priceLimits} setOrderCatagory={setOrderCatagory} selectedType={selectedType}/>
                        <Input type={"switch"} buttons={["Buy", "Sell"]} onClick={setOrderType}/>

                        <Input label={'Price'} type={'number'} icon={"$"} isDisable={isDisabled} value={order.price}
                               onChange={handlePriceChange}/>
                        <Input label={'Quantity'} type={'number'} min={1} value={order.quantity}
                               icon={order.coin?.symbol ? order.coin.symbol.toUpperCase() : ""}
                               onChange={handleQuantityChange}/>
                        <SliderInput setBalanacePr={setBalancePr}/>

                        <Input label={'Total'} type={"number"} icon={"$"} isDisable={true} placehalder={"Total"}
                               value={order.total}/>

                        <Input type="button" value={order.type} style={{marginTop: '0.7rem'}} disabled={isButtonSet}
                               onClick={saveOrder}/>
                        <p className={isError !== null ? 'order-error' : 'order-noerror'}>{isError}</p>

                    </div>
                }
            >

                <CoinBar onSelectCoin={handleCoinSelection} enableModel={true} selectedCoin={selectedCoin}/>
                <TradingChart selectedCoin={order.coin} updateLastPrice={updateLastPrice}/>
            </SidePanelWithContainer>

            <Table style={{marginTop: '1vh'}}>
                <TableRow data={[
                    'Coin',
                    'Type',
                    'Price',
                    'Quantity',
                    'Total Price',
                    ''
                ]}/>


                {limitOrder.map(order => (
                    <TableRow
                        data={[
                            <Coin>{order.coin}</Coin>,
                            order.type,
                            formatPrice(order.price),
                            order.quantity,
                            formatPrice(order.totalPrice),
                            <CancelButton confirm={confirm} orderId={order.orderId} title={'Cancel the order'} message={`Are you sure to cancel this Order`}/>
                        ]}
                    />
                ))}
            </Table>
        </BasicPage>
    )
}
