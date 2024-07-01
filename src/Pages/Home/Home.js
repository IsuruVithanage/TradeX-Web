import './Home.css';
import React from 'react';
import Input from '../../Components/Input/Input';
import Intro from '../../Components/Intro/Intro';
import { useNavigate } from 'react-router-dom';

import Alert from '../../Assets/Images/Alert.jpg';


export default function App() {
    const navigate = useNavigate();

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

            <div className='home-intro-container'>
                <Intro left={true} image={Alert} title="Watchlist">
                    The Watchlist provides real-time market data on cryptocurrencies. Users can access 
                    detailed information about specific coins, including historical data and a currency 
                    converter. Additionally, users can maintain a custom watchlist to track their preferred 
                    cryptocurrencies.
                </Intro>

                <Intro left={false} image={Alert} title="Portfolio">
                    The Portfolio feature helps users manage their cryptocurrency holdings, check wallet 
                    balances, and assess performance over time. It provides real-time portfolio valuation, 
                    tracks historical performance, and includes detailed transaction and trading history 
                    for refining strategies based on past experiences.
                </Intro>

                <Intro left={true} image={Alert} title="Trading Platform">
                    The Trading platform lets users view cryptocurrency prices visually and execute buy 
                    or sell transactions with market, limit, and stop limit orders using virtual currency. 
                    This enables risk-free trading in a secure environment.
                </Intro>

                <Intro left={false} image={Alert} title="Price Alerts">
                    The Price Alerts feature enables users to set personalized alerts on cryptocurrency 
                    market prices with extensive customization options. It also offers robust alert management 
                    capabilities, allowing users to view, add, edit, delete, or reactivate alerts, ensuring a 
                    dynamic and user-centric alert experience.
                </Intro>

                <Intro left={true} image={Alert} title="Summery Report">
                    This feature enables users to receive daily and monthly market summaries with customized 
                    options, offering detailed reports on major cryptocurrencies' performance. Summaries 
                    include market capitalization insights, top-performing cryptocurrencies, and notable gains 
                    and losses, enhancing users' understanding of the cryptocurrency landscape.
                </Intro>

                <Intro left={false} image={Alert} title="Educational Resources">
                    The Educational Resources feature provides a curated collection of videos to enhance user's 
                    understanding of cryptocurrencies and their trading strategies. Also, Users can select specific 
                    resources for a tailored learning experience and save favorites for easy access.
                </Intro>

                <Intro left={true} image={Alert} title="Support Forum">
                    The User Support Forum allows users to share knowledge by posting questions, liking, disliking, 
                    or commenting on others' posts. Important questions can be bookmarked, and the forum tracks 
                    views, likes, and replies for each post. Users can edit or delete their answers, ensuring 
                    flexibility and control over their contributions.
                </Intro>

                <Intro left={false} image={Alert} title="News">
                    The News feature delivers the latest trading updates to help users make informed decisions 
                    and stay updated. Also, Users have the ability to favorite news articles for easy access and 
                    express their preferences by liking or disliking them.
                </Intro>

                <Intro left={true} image={Alert} title="Suggestions">
                    The trading suggestion feature allows users to evaluate their past trading activities, Identifying 
                    mistakes and missed opportunities with the help of generative AI and user-friendly visual data 
                    representation.
                </Intro>

                <Intro left={false} image={Alert} title="TradeX Wallet" style={{marginBottom: "0"}}>
                    The crypto wallet feature allows users to securely manage their holdings and perform transactions. 
                    It offers a robust login system using the seed-phrase method for enhanced security and maintains a 
                    detailed history of asset transactions ensuring a transparent and secure trading experience.
                </Intro>
            </div>
        </div>
    )
}
