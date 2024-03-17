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
                    <LinearLoader variant="indeterminate" track={true}/>
                </div>
            </div>
        </div>
    );
}




export function PageLoading() {
    return (      
        <div className='page-loader-container'>        
            <LinearLoader variant="indeterminate" track={false} />
        </div>
    );
}




const LinearLoader = styled(LinearProgress)((props) => ({
  height: 3,
  borderRadius: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: props.track ? '#3c3c3c' : '#0E0E0F',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#21DB9A',
  },
}));