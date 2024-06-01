import React, { useState } from 'react';
import { InputNumber } from 'antd';
import './NumberInput.css';

export default function NumberInput(props) {
    const [step, setStep] = useState(!props.value ? 1 : () => {
        const value = String(props.value);
        if (value.includes('.')) {
            const decimalCount = value.split('.')[1].length;

            if (decimalCount > 0) {
                return 1 / Math.pow(10, decimalCount);
            }
        } else {
            return 1;
        }
    });
    let key = ''

    const formatter = (value) => {
        if (value === undefined || value === null) return '';
        const strValue = String(value);
        const parts = strValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };


    const stepCounter = (value) => {
        if (value && value.includes('.')) {
            const decimalCount = value.split('.')[1].length;

            if (decimalCount > 0 && key !== '0') {
                setStep( 1 / Math.pow(10, decimalCount));
            }
        } else {
            setStep(1);
        }
    };


    return (
        <div>
            <InputNumber
                variant="borderless"
                prefix={props.icon}
                step={step}
                min={props.min}
                max={props.max}
                style={props.style}
                id={props.id}
                name={props.name}
                value={props.value}
                disabled={props.isDisable}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onKeyPress={(e) => key = e.key}
                onChange={props.onChange}
                onInput={stepCounter}
                formatter={formatter}
                parser={(value) => parseFloat(value.replace(/[^\d.]/g, '') || 0)}
            />
        </div>
    );
}
