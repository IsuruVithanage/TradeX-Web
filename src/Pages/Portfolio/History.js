import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BasicPage from '../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer';
import Input from '../../Components/Input/Input';
import Table, { TableRow, Coin } from '../../Components/Table/Table';
import { showMessage } from '../../Components/Message/Message'

export default function History() {
    const [selectedSection, setSelectedSection] = useState("Trading");
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const backendAPI = (selectedSection === "Trading") ? "http://localhost:8011/portfolio/history/trading" : 'http://localhost:8011/portfolio/history/';
    const userId = 1;

    const coinOptions = [...new Set(historyData.map(item => item.coin))].map(coin => ({
        value: coin,
        label: coin
    }));


    const fromOptions = [...new Set(historyData.map(item => item.sendingWallet))].map(wallet => ({
        value: wallet,
        label: wallet
    }));


    const toOptions = [...new Set(historyData.map(item => item.receivingWallet))].map(wallet => ({
        value: wallet,
        label: wallet
    })); 


    useEffect(() => {
        setHistoryData([]);
        setFilteredData([]);
        setSelectedCoin(null);
        setSelectedAction(null);
        setSelectedFrom(null);
        setSelectedTo(null);
        setIsLoading(true);


        axios 
        .get( backendAPI, { params: { 
            userId: userId,
            timezoneOffset: new Date().getTimezoneOffset()
        }})

        .then((res) => {
            setHistoryData(res.data);
            setFilteredData(res.data);
            setIsLoading(false);
        })

        .catch((error) => {
            setIsLoading(false);
            console.log("Error fetching historyData", error);
            
            error.response ? 
            showMessage(error.response.status, error.response.data.message)   :
            showMessage('error', 'Database connection failed..!') ;
        });

    }, [selectedSection, backendAPI]);




    useEffect(() => {
        if(!selectedCoin && !selectedAction && !selectedFrom && !selectedTo) {
            setFilteredData(historyData);
        }
    }, [selectedCoin, selectedAction, selectedFrom, selectedTo, historyData]);





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
            isLoading={isLoading}
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
                { label:"Trading Wallet", path:"/portfolio/tradingWallet"},
                { label:"Funding Wallet", path:"/portfolio/fundingWallet"}
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
                            <Input type="dropdown" value={selectedFrom} onChange={setSelectedFrom} label='From' options={fromOptions.filter(option => option.value !== selectedTo)}/>
                            <Input type="dropdown" value={selectedTo} onChange={setSelectedTo} label='To' options={toOptions.filter(option => option.value !== selectedFrom)}/>
                            </div>:
                            <Input type="dropdown" value={selectedAction} onChange={setSelectedAction} label='Trading Action' options={[
                                { value: 'Buy', label: 'Buy' },
                                { value: 'Sell', label: 'Sell' },
                            ]}/> 
                        }
                        <Input type="button" value="Show" onClick={filterHistoryData} style={{marginTop:"50px"}}
                            disabled={!selectedCoin && !selectedAction && !selectedFrom && !selectedTo}
                        />

                        <Input type="button" value="Clear" style={{marginTop:"25px"}} red 
                            disabled={!selectedCoin && !selectedAction && !selectedFrom && !selectedTo}
                            onClick={() => {
                            setSelectedCoin(null);
                            setSelectedAction(null);
                            setSelectedFrom(null);
                            setSelectedTo(null);
                        }} />
                    </div>
                }>   

               
                
                <Table style={{marginTop:'0'}} restart={selectedSection} emptyMessage={`No ${selectedSection} History Data`}>
                    <TableRow data={
                        selectedSection === "Transaction" ?
                        ['Coin', 'Date', 'From', 'To', 'Quantity'] :
                        ['Coin', 'Date', 'Type', 'Price', 'Amount', 'Total', 'PNL']
                    } />

                    { filteredData.map((row, index) => { 
                        const senderColor = row.sendingWallet === 'Trading Wallet' || 
                        row.sendingWallet === 'Funding Wallet' ? "#FFFFFF" : "#21DB9A";

                        const receiverColor = row.receivingWallet === 'Trading Wallet' || 
                        row.receivingWallet === 'Funding Wallet' ? "#FFFFFF" : "#21DB9A";
                        
                        return(
                        <TableRow 
                            key={index} 
                            data={
                                selectedSection === "Transaction" ?
                                [
                                    <Coin>{row.coin}</Coin>,
                                    row.date,
                                    <span style={{color: senderColor, wordWrap: "break-word", textAlign: "center"}} >
                                        { row.sendingWallet }
                                    </span>,
                                    <span style={{color: receiverColor, wordWrap: "break-word", textAlign: "center"}} >
                                        { row.receivingWallet }
                                    </span>,
                                    row.quantity, 
                                ]   :
                                [
                                    <Coin>{row.coin}</Coin>,
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
                        />)
                    })}
                </Table>

            </SidePanelWithContainer>

        </BasicPage>
    );
}
