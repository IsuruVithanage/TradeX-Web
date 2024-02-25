import React, {useState} from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import Input from "../../Components/Input/Input";
import NumberInput from "../../Components/Input/NumberInput/NumberInput";
import SliderInput from "../../Components/Input/SliderInput/SliderInput";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import Table, {TableRow} from "../../Components/Table/Table";
import assets from "../Portfolio/assets.json";
import initialData from "../Portfolio/portfolio-data.json";
import LineChart from "../../Components/Charts/LineChart/LineChar";

export default function Suggestions() {
    const Tabs = [
        {label: "Suggestions", path: "/suggestion"},
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


                    </div>
                }
            >

                <CoinBar onSelectCoin={handleCoinSelection} enableModel={false}/>
                <LineChart data={initialData}></LineChart>
            </SidePanelWithContainer>

            <Table style={{marginTop: '1vh'}}>
                <TableRow data={[
                    'Coin',
                    'Date',
                    'Type',
                    'Price',
                    'Quantity',
                    'Value',
                    'PNL'
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
                        ]}
                    />
                ))}
            </Table>
        </BasicPage>
    )


}