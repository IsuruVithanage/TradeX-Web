import React, { useEffect, useState } from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer';
import Input from '../../../Components/Input/Input';
import Table, { TableRow } from '../../../Components/Table/Table';
import axios from 'axios';

export default function History() {
    const [selectedSection, setSelectedSection] = useState("Trading");
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    //const backendAPI = (selectedSection === "Trading") ? "" : 'http://localhost:8004/portfolio/history';
    const backendAPI = 'http://localhost:8004/portfolio/history';
    const userId = 1;


    const coinOptions = [...new Set(historyData.map(item => item.coin))].map(coin => ({
        value: coin,
        label: coin
    }));


    const walletOptions = [
        { value: 'Trading Wallet', label: 'Trading Wallet' },
        { value: 'Funding Wallet', label: 'Funding Wallet' },
        { value: 'External Wallet', label: 'External Wallet' },
    ]

    useEffect(() => {
        if(selectedSection === "Transaction"){
        axios
            .get(
                backendAPI,
                {
                    params: {
                        userId: userId
                    }
                },     
            )

            .then((res) => {
                setHistoryData(res.data);
                setFilteredData(res.data);
            })

            .catch((error) => {
                console.log("Error fetching historyData", error);

                if(error.response){
                    alert(error.response.data.message);
                }

                setHistoryData([]);
                setFilteredData([]);
            });
        }

        else{
            setHistoryData(require('./TradingHistory.json'));
            setFilteredData(require('./TradingHistory.json'));
        }

        setSelectedCoin(null);
        setSelectedAction(null);
        setSelectedFrom(null);
        setSelectedTo(null);
    }, [selectedSection]);


    const filterHistoryData = () => {
        let filteredData = historyData.filter(data => {
            if (selectedCoin && data.coin !== selectedCoin) return false;

            if (selectedSection === "Transaction") {
                if (selectedFrom && data.sendingWallet !== selectedFrom) return false;
                if (selectedTo && data.receivingWallet !== selectedTo) return false;
            } 
            
            else {
                if (selectedAction && data.Type !== selectedAction) return false;
            }
            return true;
        });
    
        setFilteredData(filteredData);
    }
    


    return (
        <BasicPage 
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
                { label:"Trading Wallet", path:"/portfolio/tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/fundingWallet"},
            ]}>


            <SidePanelWithContainer 
                style={{height:"91vh"}}
                header="History"
                sidePanel={
                    <div>
                        <Input type="switch" onClick={setSelectedSection} buttons= {["Trading", "Transaction"]}/>
                        <Input type="dropdown" value={selectedCoin} onChange={setSelectedCoin} label='Coin' options={coinOptions}/>
                        { selectedSection === "Transaction" ? 
                            <div>
                            <Input type="dropdown" value={selectedFrom} onChange={setSelectedFrom} label='From' options={walletOptions.filter(option => option.value !== selectedTo)}/>
                            <Input type="dropdown" value={selectedTo} onChange={setSelectedTo} label='To' options={walletOptions.filter(option => option.value !== selectedFrom)}/>
                            </div>:
                            <Input type="dropdown" value={selectedAction} onChange={setSelectedAction} label='Trading Action' options={[
                                { value: 'Buy', label: 'Buy' },
                                { value: 'Sell', label: 'Sell' },
                            ]}/> 
                        }
                        <Input type="button" value="Show" onClick={filterHistoryData} style={{marginTop:"50px"}}/>
                    </div>
                }>   

               
                
                <Table style={{marginTop:'0'}} restart={selectedSection} emptyMessage={`No ${selectedSection} History Data`}>
                    <TableRow data={
                        selectedSection === "Transaction" ?
                        ['Coin', 'Date', 'From', 'To', 'Quantity'] :
                        ['Coin', 'Date', 'Type', 'Price', 'Amount', 'Total', 'PNL']
                    } />

                    { filteredData.map((row, index) => (
                    <TableRow 
                        key={index} 
                        data={
                            selectedSection === "Transaction" ?
                            [
                                [row.coin],
                                row.date, 
                                row.sendingWallet, 
                                row.receivingWallet, 
                                row.quantity, 
                            ]   :
                            [
                                [row.coin],
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
                            ]
                        } 
                    />))}
                </Table>

            </SidePanelWithContainer>

        </BasicPage>
    )
}
