import React from 'react'
import './Loading.css'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import logo from '../../Assets/Images/trade.png'


export default function Loading() {
    return (
        <div className='loading-background'>
            <div className='loading-item-container'>
                <div className='loading-logo-container'>
                    <img src={logo} alt="TradeX" className="loading-logo" />
                </div>

                <div className='loader-container'>
                    <LinearLoader variant="indeterminate" type={"loader"} />
                </div>
            </div>
        </div>
    );
}




export function PageLoading() {
    return (
        <div className='page-loader-container'>
            <LinearLoader variant="indeterminate" type={"page-loader"} />
        </div>
    );
}




const LinearLoader = styled(LinearProgress)((props) => ({
    height: 3,
    borderRadius: 3,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: props.type === 'loader' ? '#3C3C3C' : '#0E0E0F',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: props.type === 'loader' ? '#21DB9A' : '#0B9364',
    },
}));