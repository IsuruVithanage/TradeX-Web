import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Summary from '../../Pages/Summary/Dailysummary';
import Monthlysummary from '../../Pages/Summary/Monthlysummary';

export default function SummaryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Summary />} />
      <Route path="/Dailysummary/Monthlysummary" element={<Monthlysummary />} />
    </Routes>
  )
}
