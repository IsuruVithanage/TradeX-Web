
import Dropdown from "../Dropdown/Dropdown";
import React from "react";
import { Slider } from 'antd';

const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
        style: {
            color: '#f50',
        },
        label: <strong>100°C</strong>,
    },
};

export default function Slider(props) {


    return (
        <div className='input-container'>
            <p className='label-name'>{props.label}</p>
            {
                (() => {
                    switch (props.type) {
                        case 'date':
                            return <DateInput {...props} />;
                        case 'dropdown':
                            return <Dropdown {...props} />;
                        default:
                            return <InputField {...props} />;
                    }
                })()
            }
        </div>
    );
}