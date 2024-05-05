import React, {useState} from 'react';
import {Popconfirm} from "antd";
import Input from "../Input";
import './CancelButton.css';
export default function CancelButton(props){

    const handleConfirm = () => {
        props.confirm(props.orderId);
    };

    return (
        <Popconfirm
            title={props.title}
            description={props.message}
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="No"
        >
            <Input type="button" value="Cancel" style={{width: "90px"}} outlined/>
        </Popconfirm>
    )
}