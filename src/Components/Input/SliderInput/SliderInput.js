import React, {useState} from 'react';
import { Slider } from 'antd';
import "./SliderInput.css"

const marks = {
    20: '20%',
    40: '40%',
    60: '60%',
    80: '80%',
    100: '100%',
};
export default function SliderInput({setBalanacePr}) {
    const [inputValue, setInputValue] = useState(0);
    const onChange = (newValue) => {
        setBalanacePr(newValue);
    };
    return (
        <>
            <div className='slider-container'>
                <Slider marks={marks} defaultValue={20} onChange={onChange}/>
                <div className="percentage-span">
                    <span style={{color: "#9E9E9E"}}>0%</span>
                    <span style={{color: "#9E9E9E"}}>100%</span>
                </div>
            </div>
        </>
    )
}