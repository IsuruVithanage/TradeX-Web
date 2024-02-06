import * as React from 'react';
import { InputNumber } from 'antd';
import './NumberInput.css'

export default function NumberInput(props) {
    return (
        <InputNumber type={"number"} prefix={props.icon} style={{ width: '100%' }} />
    );
}
