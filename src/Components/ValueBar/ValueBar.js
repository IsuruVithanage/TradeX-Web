import React from 'react';
import './ValueBar.css';

export default function ValueBar(props) {
    const formatCurrency = (amount) => {
        return '$ ' + Number(amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    }

    const usd = formatCurrency(props.usd);
    const value = formatCurrency(props.value);

    return (
        <div className='value-bar'>
            <div className='usd-card'>
                <span className='value-card-label'>USD Balance</span>
                <br/>
                <p className='value-card-amount' style={{color: '#21DB9A'}}>{usd}</p>
            </div>

            <div className='value-card'>
                <span className='value-card-label'>Portfolio Value</span>
                <br/>
                <p className='value-card-amount'>{value}</p>
            </div>
        </div>
    )
}

