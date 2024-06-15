import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import Forum from '../../Pages/Forum/Forum';
import AskQuestion from '../../Pages/Forum/AskQuestion';
import MyProblems from '../../Pages/Forum/MyProblems';
import MyAnswers from '../../Pages/Forum/MyAnswers';
import Detailed from '../../Components/Questionbar/Detailed';


export default function ForumRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Forum />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/myProblems" element={<MyProblems/>} />
      <Route path="/myAnswers" element={<MyAnswers/>} />
      <Route path="/discussion/:id" element={<Detailed/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
