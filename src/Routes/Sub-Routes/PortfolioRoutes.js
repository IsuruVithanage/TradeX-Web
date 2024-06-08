import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Portfolio from '../../Pages/Portfolio/Portfolio';
import History from '../../Pages/Portfolio/History';
import PortfolioWallet from '../../Pages/Portfolio/PortfolioWallet/PortfolioWallet';

export default function PortfolioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/history" element={<History />} />
      <Route path="/fundingWallet" element={<PortfolioWallet />} />
      <Route path="/tradingWallet" element={<PortfolioWallet />} />    
    </Routes>
  )
}
