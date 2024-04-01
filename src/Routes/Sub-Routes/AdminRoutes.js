import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdDashboard from '../../Pages/Watchlist/AdDashboard';
import ViewAll from '../../Pages/Watchlist/ViewAll';
import Users from '../../Pages/Watchlist/Users';
import Admin from '../../Pages/Watchlist/Admin';

export default function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Admin />} /> 
        <Route path="/AdDashboard" element={<AdDashboard />} />
        <Route path="/ViewAll" element={<ViewAll />} />
        <Route path="/Users" element={<Users />} />  
    </Routes>
  )
}