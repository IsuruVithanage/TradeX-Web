import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import {TradingChart} from "../../Components/SimulateChart/TradingChart";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import CoinBar from "../../Components/SimulateChart/CoinBar";
import './TradingPlatForm.css'
import ButtonSet from "../../Components/SimulateChart/ButtonSet";
import DualButtons from "../../Components/SimulateChart/DualButtons";
import NumberInput from "../../Components/Input/NumberInput";
import Input from "../../Components/Input/Input";

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
                line={false}
                style={{height: '530px'}}
                sidePanel={
                    <div>
                        <ButtonSet priceLimits={priceLimits}/>
                        {/*<DualButtons buttonNames={buttonNames}/>*/}
                        <Input type={"switch"} buttons={["Buy","Sell"]}/>

                        <div className='input-field-container'>
                            <label htmlFor="" className='label'>Price</label>
                            <NumberInput icon={"$"}/>
                        </div>
                        <div className='input-field-container'>
                            <label htmlFor="" className='label'>Quantity</label>
                            <NumberInput icon={"BTC"}/>
                        </div>

                    </div>
                }
            >
                <CoinBar/>
                <TradingChart/>
            </SidePanelWithContainer>
        </BasicPage>
    )
}
