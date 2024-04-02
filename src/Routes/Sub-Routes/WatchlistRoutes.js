import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Watchlist from '../../Pages/Watchlist/Watchlist';
import CustomizeWatchlist from '../../Pages/Watchlist/CustomizeWatchlist';
import CoinPage from '../../Pages/Watchlist/CoinPage';


export default function WatchlistRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Watchlist />} />
            <Route path="/customize" element={<CustomizeWatchlist />} />
            <Route path="/CoinPage" element={<CoinPage />} />
        </Routes>
    );
}
