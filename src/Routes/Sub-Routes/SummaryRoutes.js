import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import Summary from '../../Pages/Summary/Dailysummary';
import Monthlysummary from '../../Pages/Summary/Monthlysummary';
import Dailysummary from '../../Pages/Summary/Dailysummary';

export default function SummaryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Summary />} />
      <Route path="/daily" element={<Dailysummary />} />
      <Route path="/monthly" element={<Monthlysummary />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
