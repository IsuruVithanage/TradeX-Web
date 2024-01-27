import React from 'react';
import './ValueBar.css';

export default function ValueBar(props) {
    const formatCurrency = (amount) => {
        return '$ ' + Number(amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    }

    const usd = formatCurrency(props.usdBalance);
    const value = formatCurrency(props.portfolioValue);

    return (
        <div className='value-bar'>
            <div className='usd-card'>
                <div>
                    <span className='value-card-label'>USD Balance</span>
                    <p className='value-card-amount' style={{color: '#21DB9A'}}>{usd}</p>  
                </div>
            </div>

            <div className='value-card'>
                <div>
                    <span className='value-card-label'>Portfolio Value</span>
                    <p className='value-card-amount'>{value}</p>
                </div>
            </div>
        </div>
    )
}

