import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Portfolio from '../../Pages/Portfolio/Portfolio';
import TradingHistory from '../../Pages/Portfolio/History/TradingHistory';
import PortfolioWallet from '../../Pages/Portfolio/PortfolioWallet/PortfolioWallet';

export default function PortfolioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/history" element={<TradingHistory />} />
      <Route path="/:wallet" element={<PortfolioWallet />} />
    </Routes>
  )
}
