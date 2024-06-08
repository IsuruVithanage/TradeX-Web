import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Education from '../../Pages/Education/Education';
import Favorites from '../../Pages/Education/Favorites';

export default function EducationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Education />} />
      <Route path="/Favorites" element={<Favorites />} />
    </Routes>
  )
}
