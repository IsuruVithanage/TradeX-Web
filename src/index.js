import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Watchlist from './Pages/Watchlist/Watchlist';

import Portfolio from './Pages/Portfolio/Portfolio';
import TradingHistory from './Pages/Portfolio/History/TradingHistory';
import SpotWallet from './Pages/Portfolio/Wallets/SpotWallet';
import FutureWallet from './Pages/Portfolio/Wallets/FutureWallet';
import FundingWallet from './Pages/Portfolio/Wallets/FundingWallet/FundingWallet';

import Simulation from './Pages/SimulateTradingPlatform/TradingPlatform';
import Forum from './Pages/Forum/Forum';
import App from './App';
import BasicPage from './Components/BasicPage/BasicPage';
import Alert from './Pages/Alert/Alert';
import News from './Pages/News/News';

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
    path: "/portfolio/history",
    element: <TradingHistory />,
  },
  {
    path: "/portfolio/spot-wallet",
    element: <SpotWallet />,
  },
  {
    path: "/portfolio/future-wallet",
    element: <FutureWallet />,
  },
  {
    path: "/portfolio/funding-wallet",
    element: <FundingWallet />,
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
    path: "/simulate",
    element: <Simulation/>,
  },
  {
    path: "/education",
    element: <BasicPage/>,
  },
  {
    path: "/news",
    element: <News/>,
  },
  {
    path: "/alert",
    element: <Alert/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <RouterProvider router={router}/>
  // </React.StrictMode>
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
