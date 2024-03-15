import React from 'react'
import { styled } from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';

export default function FAB(props) {
    return (
        <StyledFAB id={props.id} style={props.style} onClick={props.onClick}>
            { props.icon ? props.icon : <NotificationAddOutlinedIcon style={{height: "50px"}}/> }   
        </StyledFAB>
    )
}

const StyledFAB = styled(Fab)(() => {
    return {
        position: 'fixed',
        bottom: '50px',
        right: '35px',
        color: '#21DB9A',
        backgroundColor: '#0c281e',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        '&:hover': {
            backgroundColor: '#0f3e2d'
        }
    }
});
