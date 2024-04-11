import React, {useState} from 'react';
import {InputNumber} from 'antd';
import './NumberInput.css'

export default function NumberInput(props) {
    const [step, setStep] = useState('1');

    const handleStep = (value) => {

        if (value && value.includes('.')) {
            const decimalCount = value.split('.')[1].length;
            setStep('0.'.padEnd(decimalCount + 1, '0') + '1')
        } else {
            setStep('1')
        }
    }


    return (

        <div>
            <InputNumber
                variant='borderless'
                prefix={props.icon}
                type='number'
                step={step}
                min={props.min}
                max={props.max}
                style={props.style}
                id={props.id}
                name={props.name}
                value={props.value}
                disabled={props.isDisable}
                defaultValue={props.value}
                placeholder={props.placeholder}
                onBlur={props.onBlur}
                onChange={props.onChange && props.onChange}
                onInput={handleStep}
            />
        </div>

    );
}
