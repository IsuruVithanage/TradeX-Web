import React from 'react'
import './Loading.css'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import logo from '../../Assets/Images/trade.png'


export default function Loading() {
    return (
        <div className='loading-background' style={{backgroundColor: "#000000"}}>
            <div className='loading-item-container'>
                <div className='loading-logo-container'>
                    <img src={logo} alt="TradeX" className="loading-logo" />
                </div>
                
                <div className='loader-container'>
                    <LinearLoader variant="indeterminate" />
                </div>
            </div>
        </div>
    );
}




export function PageLoading() {
    return (
        <div className='loading-background' style={{backgroundColor: "#00000050"}}>      
            <div className='page-loading-item-container'>        
                <LinearLoader variant="indeterminate" />
            </div>
        </div>
    );
}




const LinearLoader = styled(LinearProgress)(() => ({
  height: 3,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#3c3c3c',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#21DB9A',
  },
}));