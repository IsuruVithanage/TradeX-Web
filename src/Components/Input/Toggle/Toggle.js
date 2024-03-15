import React from 'react'
import { styled } from "@mui/material/styles";
import Switch from '@mui/material/Switch';


const StyledSwitch = styled(Switch)(() => {
    return {
        '&.MuiSwitch-root': {
            transform: 'translateX(10px)',
        },
        '& .MuiSwitch-switchBase': {
            color: '#9E9E9E',
            '&.Mui-checked': {
                color: '#21DB9A',
                '& + .MuiSwitch-track': {
                    backgroundColor: '#21DB9A60 !important',    
                },
            },
        },
        '& .MuiSwitch-track': {
            backgroundColor: '#3C3C3C !important',
            opacity: '1 !important',
            height: '14px',
            width: '40px',
        },
    }
});


export default function Toggle(props) {
    const handleChange = (e) => {
        props.onChange(e.target.checked)
    }

    return (
        <label style={{
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginTop: "30px", 
                color: "#9E9E9E", 
                cursor: "pointer"
            }}>

            <span style={{
                fontFamily: "Inter, sans-serif", 
                fontSize: "16px", 
                fontWeight: "500"
            }} >{props.toggleLabel}</span>

            <StyledSwitch
                id={props.id}
                name={props.name}
                checked={props.checked}
                onChange={props.onChange && handleChange}
                onClick={props.onClick}
            />
        </label>
        
    )
}
