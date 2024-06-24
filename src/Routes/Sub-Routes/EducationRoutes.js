import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import Education from '../../Pages/Education/Education';
import Favorites from '../../Pages/Education/Favorites';

export default function EducationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Education />} />
      <Route path="/Favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
