import React, { useState, useEffect } from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer';
import Input from '../../../Components/Input/Input';
import Table, { TableRaw } from '../../../Components/Table/Table';

export default function History() {
    const tradingHistry = require('./TradingHistory.json');
    const [selectedSection, setSelectedSection] = useState("Trading");
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const historyData = (selectedSection === "Trading") ? tradingHistry.Trading : tradingHistry.Transaction;

    useEffect(() => {
        console.log(selectedSection);
        console.log(selectedCoin);
        console.log(selectedAction);
        console.log(selectedFrom);
        console.log(selectedTo);
    }, [selectedSection, selectedCoin, selectedAction, selectedFrom, selectedTo]);

    const options = [
        { value: 'BTC', label: 'BTC' },
        { value: 'ETH', label: 'ETH' },
        { value: 'DOGE', label: 'DOGE' },
        { value: 'ADA', label: 'ADA' },
        { value: 'BNB', label: 'BNB' },
        { value: 'XRP', label: 'XRP' },
    ];

    const walletOptions = [
        { value: 'Trading Wallet', label: 'Trading Wallet' },
        { value: 'Funding Wallet', label: 'Funding Wallet' },
        { value: 'External Wallet', label: 'External Wallet' },
    ]


    return (
        <BasicPage 
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
                { label:"Trading Wallet", path:"/portfolio/wallet?tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/wallet?fundingWallet"},
            ]}>


            <SidePanelWithContainer 
                style={{height:"91vh"}}
                line = {false}
                sidePanel={
                    <div>
                        <Input type="switch" onClick={setSelectedSection} buttons= {["Trading", "Transaction"]}/>
                        <Input type="dropdown" onChange={setSelectedCoin} label='Coin' options={options}/>
                        { selectedSection === "Transaction" ? 
                            <div>
                            <Input type="dropdown" onChange={setSelectedFrom} label='From' options={walletOptions.filter(option => option.value !== selectedTo)}/>
                            <Input type="dropdown" onChange={setSelectedTo} label='To' options={walletOptions.filter(option => option.value !== selectedFrom)}/>
                            </div>:
                            <Input type="dropdown" onChange={setSelectedAction} label='Trading Action' options={[
                                { value: 'buy', label: 'Buy' },
                                { value: 'sell', label: 'Sell' },
                            ]}/> 
                        }
                        <Input type="button" value="Show" style={{marginTop:"40px"}}/>
                        <Input type="button" value="Export" />
                    </div>
                }>   

            
                { selectedSection === "Transaction" ? (
                    <Table style={{marginTop:'0'}}>
                        <TableRaw data={['Coin', 'Date', 'From', 'To', 'Quantity']} />
                        { historyData.map((row, index) => (
                        <TableRaw 
                            key={index} 
                            data={[
                            [row.Coin],
                            row.Date, 
                            row.From, 
                            row.To, 
                            row.Quantity, 
                            ]} 
                        />))}
                    </Table> ) : 

                    <Table style={{marginTop:'0'}}>
                        <TableRaw data={['Coin', 'Date', 'Type', 'Price', 'Amount', 'Total', 'PNL']} />
                        { historyData.map((row, index) => (
                        <TableRaw 
                            key={index} 
                            data={[
                            [row.Coin],
                            row.Date, 
                            row.Type, 
                            `$ ${row.Price}`, 
                            row.Amount, 
                            `$ ${row.Price * row.Amount}`,
                            <span 
                                style={{ 
                                color: (row.PNL < 0) ? '#FF0000' : (row.PNL > 0) ? '#21DB9A' : '' 
                                }}>
                                {`${row.PNL} %`}
                            </span>
                            ]} 
                        />
                        ))}
                    </Table>
                }

            </SidePanelWithContainer>

        </BasicPage>
    )
}
