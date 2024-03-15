import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Watchlist from '../../Pages/Watchlist/Watchlist';
import CustomizeWatchlist from '../../Pages/Watchlist/CustomizeWatchlist';
import CoinPage from '../../Pages/Watchlist/CoinPage';
import AdDashboard from '../../Pages/Watchlist/AdDashboard';
import ViewAll from '../../Pages/Watchlist/ViewAll';
import Users from '../../Pages/Watchlist/Users';
import Admin from '../../Pages/Watchlist/Admin';

export default function WatchlistRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Watchlist />} />
            <Route path="/customize" element={<CustomizeWatchlist />} />
            <Route path="/CoinPage" element={<CoinPage />} />
            <Route path="/AdDashboard" element={<AdDashboard />} />
            <Route path="/ViewAll" element={<ViewAll />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Admin" element={<Admin />} /> 
        </Routes>
    );
}
