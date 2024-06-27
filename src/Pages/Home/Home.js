import './Home.css';
import React from 'react';
import Input from '../../Components/Input/Input';
import Documentation from '../../Components/Documentation/Documentation';
import { useNavigate } from 'react-router-dom';
import { Anchor } from 'antd';


export default function App() {
    const navigate = useNavigate();

    const items = [
        {   key: 'watchlist', href: '#watchlist', title: 'Watchlist' },
        {   key: 'portfolio', href: '#portfolio', title: 'Portfolio' },
        {   key: 'platform', href: '#platform', title: 'Trading Platform' },
        {   key: 'alert' , href: '#alert', title: 'Price Alerts'},
        {   key: 'summary', href: '#summary', title: 'Summery Report'},
        {   key: 'education', href: '#education', title: 'Educational Resources'},
        {   key: 'forum', href: '#forum', title: 'Support Forum'},
        {   key: 'news', href: '#news', title: 'News'},
        {   key: 'suggestions', href: '#suggestions', title: 'Suggestions'},
        {   key: 'wallet', href: '#wallet', title: 'TradeX Wallet'}
    ]

    return (
        <div>
            <div className='home-entry-container'>
                <span style={{ fontSize: "70px", color: "#ffffff", fontWeight: "800" }}>CRYPTO</span><span style={{ fontSize: "70px", color: "#21DB9A", fontWeight: "800" }}>CURRENCY</span>
                <p style={{ fontSize: "35px", color: "#21DB9A", fontWeight: "700" }}>SIMULATION  PLATFORM</p>
                <p style={{ fontSize: "18px", color: "#ffffff", width: "838px" }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                </p>

                <Input
                    type="button"
                    value="Get Started"
                    onClick={() => navigate('/login')}
                    style={{ width: "125px", height: "40px", marginTop: "50px" }}
                />
            </div>

            <div className='home-details-container'>
                <div className='home-anchor-container'>
                    <Anchor items={items} replace={true} />
                </div>

                <div className='home-content-container'>
                    <Documentation id='watchlist'></Documentation>
                    <Documentation id='portfolio'></Documentation>
                    <Documentation id='platform'></Documentation>
                    <Documentation id='alert'></Documentation>
                    <Documentation id='summary'></Documentation>
                    <Documentation id='education'></Documentation>
                    <Documentation id='forum'></Documentation>
                    <Documentation id='news'></Documentation>
                    <Documentation id='suggestions'></Documentation>
                    <Documentation id='wallet'></Documentation>
                </div>
            </div>
        </div>
    )
}
