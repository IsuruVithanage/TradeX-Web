import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Watchlist from './Pages/Watchlist/Watchlist';
import Portfolio from './Pages/Portfolio/Portfolio';
import Forum from './Pages/Forum/Forum';
import App from './App';
import './index.css';
import BasicPage from './Components/BasicPage/BasicPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/watchlist",
    element: <Watchlist />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/forum",
    element: <Forum />,
  },
  {
    path: "/dataVisualization",
    element: <BasicPage/>,
  },
  {
    path: "/settings",
    element: <BasicPage/>,
  },
  {
    path: "/trade",
    element: <BasicPage/>,
  },
  {
    path: "/educatiion",
    element: <BasicPage/>,
  },
  {
    path: "/news",
    element: <BasicPage/>,
  },
  {
    path: "/alert",
    element: <BasicPage/>,
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
