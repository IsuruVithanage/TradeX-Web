import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import TradingChart from "../../Components/TradingChart";

export default function SimulateTradingPlatform() {
    const Tabs = [
        { label:"Home", path:"/"},
        { label:"Watchlist", path:"/watchlist"},
        { label:"Alert", path:"/alert"},
        { label:"Portfolio", path:"/portfolio"},
    ];

    return (
        <BasicPage tabs={Tabs}>
            <TradingChart/>

        </BasicPage>
    )
}
