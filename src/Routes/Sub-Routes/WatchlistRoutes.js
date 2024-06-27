import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import Watchlist from '../../Pages/Watchlist/Watchlist';
import CustomizeWatchlist from '../../Pages/Watchlist/CustomizeWatchlist';
import CoinPage from '../../Pages/Watchlist/CoinPage';


export default function WatchlistRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Watchlist />} />
            <Route path="/customize" element={<CustomizeWatchlist />} />
            <Route path="/coin/:symbol" element={<CoinPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
