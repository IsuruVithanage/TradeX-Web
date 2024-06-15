import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import AdDashboard from '../../Pages/Watchlist/AdDashboard';
import ViewAll from '../../Pages/Watchlist/ViewAll';
import ViewIssues from '../../Pages/Watchlist/ViewIssues';
import Users from '../../Pages/Watchlist/Users';
import Admin from '../../Pages/Watchlist/Admin';

export default function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Admin />} /> 
        <Route path="/AdDashboard" element={<AdDashboard />} />
        <Route path="/ViewAll" element={<ViewAll />} />
        <Route path="/ViewIssues" element={<ViewIssues />} />
        <Route path="/Users" element={<Users />} />  
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}