import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Summary from '../../Pages/Summary/Dailysummary';
import Monthlysummary from '../../Pages/Summary/Monthlysummary';
import Dailysummary from '../../Pages/Summary/Dailysummary';

export default function SummaryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Summary />} />
      <Route path="/Dailysummary/Monthlysummary" element={<Monthlysummary />} />
      <Route path="/Monthlysummary/Dailysummary" element={<Dailysummary />} />
    </Routes>
  )
}
