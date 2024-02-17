import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Watchlist from './Pages/Watchlist/Watchlist';
import CustomizeWatchlist from './Pages/Watchlist/CustomizeWatchlist';
import Portfolio from './Pages/Portfolio/Portfolio';
import TradingHistory from './Pages/Portfolio/History/TradingHistory';
import PortfolioWallet from './Pages/Portfolio/PortfolioWallet/PortfolioWallet';
import Simulation from './Pages/SimulateTradingPlatform/TradingPlatform';
import Forum from './Pages/Forum/Forum';
import App from './App';
import BasicPage from './Components/BasicPage/BasicPage';
import Alert from './Pages/Alert/Alert';
import News from './Pages/News/News';
import Favourite from './Pages/News/Favourite';
import Welcome from './Pages/ExternalWallet/Welcome/Welcome';
import LoginPage1 from './Pages/ExternalWallet/LoginPage-1/LoginPage1';
import AskQuestion from './Pages/Forum/AskQuestion';
import ChangePassword from './Pages/ExternalWallet/LoginPage-1/ChangePassword/ChangePassword';
import SetPassword from './Pages/ExternalWallet/LoginPage-1/SetPassword/SetPassword';






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
    path: "/watchlist/customize",
    element:<CustomizeWatchlist/>
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
    path: "/portfolio/wallet",
    element: <PortfolioWallet />,
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
    path: "/news/favourite",
    element: <Favourite/>,
  },
  {
    path: "/alert",
    element: <Alert/>,
  },

  {
    path: "/externalwallet",
    element: <Welcome/>,
  },
  {
    path: "/wallet/login",
    element: <LoginPage1/>,
  },
  {
    path: "/wallet/login/changepassword",
    element: <ChangePassword/>,
  },
  {
    path: "/wallet/login/setpassword",
    element: <SetPassword/>,
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
