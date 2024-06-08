import React from 'react';
import './ValueBar.css';

export default function ValueBar(props) {
    const formatCurrency = (amount) => {
        return amount !== null ?
         ('$ ' + amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })) : ' ';
    }

    const usd = formatCurrency(props.usdBalance);
    const value = formatCurrency(props.portfolioValue);

    return (
        <div className='value-bar'>
            <div className='usd-card'>
                <span className='value-card-label'>USD Balance</span>
                <span className='value-card-amount' style={{color: '#21DB9A'}}>{usd}</span>  
            </div>

            <div className='value-card'>
                <span className='value-card-label'>Portfolio Value</span>
                <span className='value-card-amount'>{value}</span>
            </div>
        </div>
    )
}

