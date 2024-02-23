import React, {useState} from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import './TradingPlatForm.css'
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import Input from "../../Components/Input/Input";
import NumberInput from "../../Components/Input/NumberInput/NumberInput";
import SliderInput from "../../Components/Input/SliderInput/SliderInput";
import Table, {TableRow} from "../../Components/Table/Table";
import assets from "../Portfolio/assets.json";

export default function TradingPlatform() {

    const Tabs = [
        {label: "Spot", path: "/simulate"},
    ];

    const priceLimits = ['Limit', 'Market', 'Stop Limit'];


    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleCoinSelection = (coin) => {
        setSelectedCoin(coin);
    };

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                line={false}
                style={{height: '530px', padding: "22px"}}
                sidePanel={
                    <div>
                        <h1 className="tradeHeader">Trade</h1>
                        <ButtonSet priceLimits={priceLimits}/>
                        <Input type={"switch"} style={{width: "18rem", marginLeft: "0.6rem"}}
                               buttons={["Buy", "Sell"]}/>

                        <div className='input-field-container'>
                            <label htmlFor="" className='label'>Price</label>
                            <NumberInput icon={"$"}/>
                        </div>
                        <div className='input-field-container'>
                            <label htmlFor="" className='label'>Quantity</label>
                            <NumberInput icon={selectedCoin?.symbol ? selectedCoin.symbol.toUpperCase() : ""}/>
                        </div>

                        <SliderInput/>

                        <div className='input-field-container'>
                            <label htmlFor="" className='label'>Total</label>
                            <Input type={"text"} placehalder={"Total"}/>
                        </div>

                        <div className="trade-btn-container">
                            <Input type="button" style={{padding: "0 1rem 0 1rem"}} value="Buy"/>
                        </div>

                    </div>
                }
            >

                <CoinBar onSelectCoin={handleCoinSelection}/>
                <TradingChart/>
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
                            <Input type="button" value="Cancel" style={{width:"90px"}} outlined/>
                            ]}
                    />
                ))}
            </Table>
        </BasicPage>
    )
}
