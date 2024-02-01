import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import TopNavBar from "../../Components/BasicPage/TopNavBar/TopNavBar";
import ButtonSet from "../../Components/SimulateChart/ButtonSet";

export default function Portfolio() {

    const Tabs = [
        {label: "Limit", path: "/simulate"},
        {label: "Market", path: "/"},
        {label: "StopLimit", path: "/"},
    ];


    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                header='Trade'
                style={{height: '530px'}}
                sidePanel={<div>
                    <ButtonSet tabs={Tabs}/>

                </div>}
            >
                <CoinBar/>
                <TradingChart/>
            </SidePanelWithContainer>
        </BasicPage>
    )
}
