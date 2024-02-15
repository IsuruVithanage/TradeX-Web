import React from 'react';
import { Slider } from 'antd';
import "./SliderInput.css"
const marks = {
    20: '20%',
    40: '40%',
    60: '60%',
    80: '80%',
    100: '100%',
};
const App = () => (
    <>
        <div>
            <Slider marks={marks} defaultValue={20} />
            <div className="percentage-span">
                <span style={{ color: "#9E9E9E" }}>0%</span>
                <span style={{ color: "#9E9E9E" }}>100%</span>
            </div>
        </div>
    </>
);
export default App;