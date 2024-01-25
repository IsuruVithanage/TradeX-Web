import React from 'react';
import './NewsBar.css';

const NewsBar = () => {
    return (
        <div className='newsbar-container'>
            <div className='img-container'></div>
            <div className='desc-container'>
                <h1>Vitalik Buterin Shares New Ethereum Vision</h1>
                <p>Vitalik Buterin has voiced a new vision for the Ethereum platform that seeks to address its most pressing challenges...</p>
            </div>
            <div className='foter-bar'></div>
        </div>
    );
};

export default NewsBar;
