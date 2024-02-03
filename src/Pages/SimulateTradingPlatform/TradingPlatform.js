import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import TopNavBar from "../../Components/BasicPage/TopNavBar/TopNavBar";
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import DualButtons from "../../Components/SimulateChart/DualButtons";

export default function Portfolio() {

    const Tabs = [
        {label: "Spot", path: "/simulate"},
        {label: "Future", path: "/"},
    ];

    const priceLimits = ['Limit', 'Market', 'Stop Limit'];

    const buttonNames = ['Buy', 'Sell'];


    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                header='Trade'
                style={{height: '530px'}}
                sidePanel={
                    <div>
                        <ButtonSet priceLimits={priceLimits}/>
                        <DualButtons buttonNames={buttonNames}/>
                    </div>
                }
            >
                <CoinBar/>
                <TradingChart/>
            </SidePanelWithContainer>
        </BasicPage>
    )
}
