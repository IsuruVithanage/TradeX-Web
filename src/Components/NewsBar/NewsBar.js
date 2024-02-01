import React from 'react';
import './NewsBar.css';
import News from '../../Assets/Images/news.jpg'


const NewsBar = () => {
    return (
        <a href="t">
        <div className='newsbar-container'>
            <div className='img-container'><img src={News}  alt="fffff" /></div>
            <div className='desc-container'>
                <h1>Vitalik Buterin Shares New Ethereum Vision</h1>
                <p>Vitalik Buterin has voiced a new vision for the Ethereum platform that seeks to address its most pressing challenges...</p>
            </div>
            <div className='foter-bar'></div>
        </div>
        </a>
    );
};

export default NewsBar;
