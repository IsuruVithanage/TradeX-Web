import React from 'react';
import { Popconfirm } from "antd";
import Input from "../Input";
import './CancelButton.css';


export default function BuyButton(props){
    const handleConfirm = () => {
        props.confirm();
    };

    return (
        <Popconfirm
            title={props.title}
            placement="bottom"
            description={props.message}
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="No"
        >
            <Input type="button" value={props.value}  style={{marginTop: '0.7rem'}} disabled={props.disabled}/>
        </Popconfirm>
    )
}