import React, {useEffect, useState} from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import './TradingPlatForm.css'
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import Input from "../../Components/Input/Input";
import TestChart from "./TestChart"
import SliderInput from "../../Components/Input/SliderInput/SliderInput";
import Table, {TableRow, Coin} from "../../Components/Table/Table";
import {useSelector} from "react-redux";
import {showMessage} from "../../Components/Message/Message";
import CancelButton from "../../Components/Input/Button/CencelButton";
import BuyButton from "../../Components/Input/Button/BuyButton";

export default function TradingPlatform({firebase}) {
    const user = useSelector(state => state.user);

    /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        firebase.onMessage(() => {
            console.log('Message received:');
            console.log('Message EKA AWAMA METHANA OONE DEYAK KARAPANNN');
        });
    }, [firebase]);

    const Tabs = [
        {label: "Spot", path: "/simulate"},
        {label: "Quiz", path: "/quiz"},
    ];

    const [latestPrice, setLatestPrice] = useState(0);
    const [latestTime, setLatestTime] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const [balanceSymble, setBalanceSymble] = useState('$');
    const [balancePr, setBalancePr] = useState(0);
    const [limitOrder, setLimitOrder] = useState([]);
    const [isButtonSet, setIsButtonSet] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isError, setIsError] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const [order, setOrder] = useState({
        userId: user.id,
        type: 'Buy',
        date: '',
        category: 'Limit',
        coin: null,
        price: 0,
        quantity: 0,
        total: 0,
        time: 0,
        orderStatus: ''
    });

    useEffect(() => {
        const savedState = localStorage.getItem('tradingPlatformState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setOrder(parsedState.order);
            setLimitOrder(parsedState.limitOrder);
            handleCoinSelection(parsedState.selectedCoin);
            setOrderCatagory(parsedState.selectedType);
            setSelectedType(parsedState.selectedType);
        } else {
            setOrder({
                userId: user.id,
                type: 'Buy',
                date: '',
                category: 'Limit',
                coin: null,
                price: 0,
                quantity: 0,
                total: 0,
                time: 0,
                orderStatus: ''
            });
            setLimitOrder([]);
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
            if (order.type === 'Sell') {
                setBalanceSymble(coin.symbol);
            }
            fetchLimitOrders(coin.symbol.toUpperCase());
        }
    };

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8081');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'order_completed') {
                fetchLimitOrders(selectedCoin?.symbol?.toUpperCase());
                showMessage('success', `Your order for ${data.order.coin} has been completed at ${data.order.price}`);
            }
        };

        return () => {
            ws.close();
        };
    }, [selectedCoin]);

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
        fetch(`http://localhost:8011/portfolio/asset/${user.user.id}/${balanceSymble === '$' ? 'USD' : selectedCoin.symbol}`)
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
            type: order.type,
            category: order.category,
            totalPrice: order.total,
            time: order.category !== 'Market' ? 0 : latestTime,
            orderStatus: order.category === 'Market' ? 'Completed' : 'Pending'
        }
    }


    const setOrderCatagory = (value) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            category: value
        }));
        console.log(order.category)
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

    const updateLastPrice = (price, time) => {
        setLatestPrice(price);
        setLatestTime(time);
    };

    useEffect(() => {
        if (order.category === 'Market') {
            handlePriceChange(latestPrice);
        }
    }, [order.category, latestPrice]);


    const handlePriceChange = (value) => {
        console.log(value)
        setOrder(prevOrder => ({
            ...prevOrder,
            price: value
        }));

        setOrder(prevOrder => ({
            ...prevOrder,
            total: value * order.quantity
        }));

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

    useEffect(() => {
        getWalletBalance();
    }, [balanceSymble, selectedCoin]);

    const setOrderType = (type) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            type: type
        }));

        if (type === 'Sell') {
            setBalanceSymble(selectedCoin.symbol);
            //getWalletBalance();
        } else {
            setBalanceSymble('$');
            //getWalletBalance();

        }
    }


    const saveOrder = () => {
        if (walletBalance < order.total && order.type === 'Buy') {
            showMessage('Error', 'Wallet balance is insufficient!');
            return;
        } else if (walletBalance < order.quantity && order.type === 'Sell') {
            showMessage('Error', 'Wallet balance is insufficient!');
            return;
        }

        const ob = {
            userId: user.user.id,
            coin: order.coin.symbol.toUpperCase(),
            quantity: order.quantity,
            price: order.price,
            category: order.category,
            type: order.type
        }

        if (!ob.userId || !ob.coin || !ob.quantity || !ob.price || !ob.category || !ob.type) {
            console.error('Invalid order:', ob);
            return;
        }

        if (ob.quantity < 0) {
            showMessage('Error', 'Please enter the quantity!');
            return;
        }

        setIsLoading(false);


        fetch('http://localhost:8011/portfolio/asset/trade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ob)
        })
            .then(response => response.json())
            .then(data => {
                console.log('gvgh', data);
                if (order.type === 'Buy') {
                    setWalletBalance(data[0].balance);
                } else {
                    setWalletBalance(data[1].balance);
                }

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
                    if (order.category === 'Limit') {
                        fetchLimitOrders(selectedCoin.symbol.toUpperCase());
                    }
                    //fetchLimitOrders(selectedCoin.symbol);
                } else {
                    console.error('Failed to save order:', response);
                }
            })
            .catch(error => {
                console.error('Failed to save order:', error);
            });
    }

    useEffect(() => {
        if (order.total > walletBalance && order.type === 'Buy') {
            setIsButtonSet(true);
            setIsError('Wallet balance is insufficient!');
        } else if (order.quantity > walletBalance && order.type === 'Sell') {
            setIsButtonSet(true);
            setIsError('Wallet balance is insufficient!');
        }
    }, [order.total, order.price, order.quantity]);

    useEffect(() => {
        if (order.type === 'Buy') {
            const value = (walletBalance * (balancePr / 100));
            let quantity = value / order.price;
            if (balancePr !== 0) {
                setIsError(null);
                quantity=parseFloat(quantity.toFixed(4));
                setOrder(prevOrder => ({
                    ...prevOrder,
                    quantity: quantity
                }));
                setOrder(prevOrder => ({
                    ...prevOrder,
                    total: parseFloat((quantity * order.price).toFixed(4))
                }));

                setIsButtonSet(false);
            }
        } else if (order.type === 'Sell') {
            let value = (walletBalance * (balancePr / 100));
            if (balancePr !== 0) {
                setIsError(null);
                value=parseFloat(value.toFixed(4));
                setOrder(prevOrder => ({
                    ...prevOrder,
                    quantity: value
                }));
                setOrder(prevOrder => ({
                    ...prevOrder,
                    total: parseFloat((value * order.price).toFixed(4))
                }));

                setIsButtonSet(false);
            }
        }
    }, [balancePr]);


    const formatPrice = (price) => {
        return "$ " + price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatTo6Decimal = (value) => {
        if (typeof value === 'number' && balanceSymble !== '$') {
            return parseFloat(value).toFixed(5);
        } else if (typeof value === 'number' && balanceSymble === '$') {
            return value.toLocaleString();
        }
        return value;
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
                        <div style={{display: 'flex'}}>
                            <h1 className="tradeHeader" style={{marginRight: '3.3rem'}}>Trade</h1>
                            <h1 className="tradeHeader"
                                style={{color: '#21db9a'}}>{balanceSymble + " "}{formatTo6Decimal(walletBalance)}</h1>
                        </div>
                        <ButtonSet priceLimits={priceLimits} setOrderCatagory={setOrderCatagory}
                                   selectedType={selectedType}/>
                        <Input type={"switch"} buttons={["Buy", "Sell"]} onClick={setOrderType}/>

                        <Input label={'Price'} type={'number'} icon={"$"} isDisable={isDisabled} value={order.price}
                               onChange={handlePriceChange}/>
                        <Input label={'Quantity'} type={'number'} min={1} value={order.quantity}
                               icon={order.coin?.symbol ? order.coin.symbol.toUpperCase() : ""}
                               onChange={handleQuantityChange}/>
                        <SliderInput setBalanacePr={setBalancePr}/>

                        <Input label={'Total'} type={"number"} icon={"$"} isDisable={true} placehalder={"Total"}
                               value={order.total}/>

                        <BuyButton confirm={saveOrder} value={order.type} orderId={order.orderId} disabled={isButtonSet} title={'Confirm Order'}
                                      message={`Are you sure to place this Order`}/>
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
                    'Category',
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
                            order.category,
                            formatPrice(order.price),
                            order.quantity,
                            formatPrice(order.totalPrice),
                            <CancelButton confirm={confirm} name={'Cancel'} orderId={order.orderId} title={'Cancel the order'}
                                          message={`Are you sure to cancel this Order`}/>
                        ]}
                    />
                ))}
            </Table>
        </BasicPage>
    )
}
