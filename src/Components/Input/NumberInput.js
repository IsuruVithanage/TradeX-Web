import React, { useState } from 'react';
import { InputNumber } from 'antd';
import './NumberInput.css'

export default function NumberInput(props) {
    const [step, setStep] = useState('1');
    
    const handleStep = (value)=> {
        if (value && value.includes('.')) {
            const decimalCount = value.split('.')[1].length;
            setStep ( '0.'.padEnd(decimalCount + 1, '0') + '1' )
        } else {
            setStep('1')
        } 
    }


    return (
        <InputNumber 
            prefix={props.icon} 
            style={{ width: '100%' }} id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onInput={handleStep} 
        />
    );
}
