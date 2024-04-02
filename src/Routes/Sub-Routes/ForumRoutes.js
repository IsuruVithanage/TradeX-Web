import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Forum from '../../Pages/Forum/Forum';
import AskQuestion from '../../Pages/Forum/AskQuestion';
import MyProblems from '../../Pages/Forum/MyProblems';
import MyAnswers from '../../Pages/Forum/MyAnswers';


export default function ForumRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Forum />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/myProblems" element={<MyProblems/>} />
      <Route path="/myAnswers" element={<MyAnswers/>} />
      
    </Routes>
  )
}
