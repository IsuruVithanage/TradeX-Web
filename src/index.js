import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Watchlist from './Pages/Watchlist/Watchlist';
import CustomizeWatchlist from './Pages/Watchlist/CustomizeWatchlist';
import CoinPage from './Pages/Watchlist/CoinPage';
import AdDashboard from './Pages/Watchlist/AdDashboard';
import ViewAll from './Pages/Watchlist/ViewAll';
import Users from './Pages/Watchlist/Users';
import Admin from './Pages/Watchlist/Admin';
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
import SetPassword from './Pages/ExternalWallet/LoginPage-1/SetPassword/SetPassword';
import ConfirmSecretPhrase from './Pages/ExternalWallet/LoginPage-1/SetPassword/SecretPhrase/ConfirmSecretPhrase/ConfirmSecretPhrase';
import DashBoard from './Pages/ExternalWallet/DashBoard/DashBoard';
import RecoverWallet from './Pages/ExternalWallet/LoginPage-1/ChangePassword/RecoverWallet/RecoverWallet';
import SecretPhrase from './Pages/ExternalWallet/LoginPage-1/SetPassword/SecretPhrase/SecretPhrase';
import HaveAccount from './Pages/ExternalWallet/LoginPage-1/HaveAccount/HaveAccount';
import ChangePassword from './Pages/ExternalWallet/LoginPage-1/ChangePassword/ChangePassword'
import MyProblems from './Pages/Forum/MyProblems';
import Dailysummary from './Pages/Summary/Dailysummary';
import Suggestions from "./Pages/Suggestions/Suggestions";
import Quiz from "./Pages/Quiz/Quiz";
import UserProfileTab from "./Pages/User/UserProfileTab";
import VerifyUser from "./Pages/User/VerifyUser";
import Monthlysummary from './Pages/Summary/Monthlysummary';
import MyAnswers from './Pages/Forum/MyAnswers';
import Detailed from './Components/Questionbar/Detailed';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
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
    path: "/watchlist/CoinPage",
    element:<CoinPage/>
  },
  {
    path: "/watchlist/AdDashboard",
    element:<AdDashboard/>
  },
  {
    path: "/watchlist/ViewAll",
    element:<ViewAll/>
  },
  {
    path: "/watchlist/Users",
    element:<Users/>
  },
  {
    path: "/watchlist/Admin",
    element:<Admin/>
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
    path: "/portfolio/:wallet",
    element: <PortfolioWallet />,
  },
  {
    path: "/forum",
    element: <Forum />,
  },
  {
    path: "/AskQuestion",
    element: <AskQuestion />,
  },
  {
    path: "/forum/MyProblems",
    element: <MyProblems/>,
  },
  {
    path: "/forum/MyAnswers",
    element: <MyAnswers/>,
  },
  {
    path: "/summary",
    element: <Dailysummary/>,
  },
  {
    path: "/Summary/Dailysummary/Monthlysummary",
    element: <Monthlysummary/>,
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
    path: "/suggestion",
    element: <Suggestions/>,
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
    path: "/wallet/login/HaveAccount",
    element: <HaveAccount/>,
  },
  {
    path: "/wallet/login/setpassword",
    element: <SetPassword/>,
  },
  {
    path: "/wallet/login/setpassword/secretphrase",
    element: <SecretPhrase/>,
  },
  {
    path: "/wallet/login/setpassword/secretphrase/confirmsecretphrase",
    element: <ConfirmSecretPhrase/>,
  },
  {
    path: "/wallet/dashboard",
    element: <DashBoard/>,
  },
  {
    path: "/wallet/login/changepassword/recoverwallet",
    element: <RecoverWallet/>,
  },
  {
    path: "/wallet/login/changepassword",
    element: <ChangePassword/>,
  },
  {
    path: "/Questionbar/Detailed",
    element: <Detailed />,
  },
  {
    path: "/quiz",
    element: <Quiz/>,
  },
  {
    path: "/profile",
    element: <UserProfileTab/>,
  },
  {
    path: "/verify",
    element: <VerifyUser/>,
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

