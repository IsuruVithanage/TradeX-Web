import './App.css';

import BasicPage from './Components/BasicPage/BasicPage';
import NumberInput from "./Components/SidePanelItems/SidePanelInput/NumberInput";
import {useState} from "react";
import NumberInputBasic from "./Components/SidePanelItems/SidePanelInput/NumberInput";


export default function App() {
    const Tabs = [
        {label: "Home", path: "/"},
        {label: "Watchlist", path: "/watchlist"},
        {label: "Alert", path: "/alert"},
    ];

    const [numberValue, setNumberValue] = useState(0);

    const handleValueChange = (value) => {
        // Convert the value to a number before setting it in the state
        setNumberValue(Number(value));
        console.log(numberValue);
    };


    return (
        <BasicPage tabs={Tabs}>
            <div style={{width: "300px", height: "200px"}}>
                <NumberInputBasic onValueChange={handleValueChange}/>
            </div>
            <p>{numberValue}</p>


        </BasicPage>
    )
}