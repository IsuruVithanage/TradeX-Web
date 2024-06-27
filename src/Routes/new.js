import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Admin from "./Sub-Routes/AdminRoutes";
import Watchlist from "./Sub-Routes/WatchlistRoutes";
import Portfolio from "./Sub-Routes/PortfolioRoutes";
import Forum from "./Sub-Routes/ForumRoutes";
import Summary from "./Sub-Routes/SummaryRoutes";
import Education from "./Sub-Routes/EducationRoutes";
import News from "./Sub-Routes/NewsRoutes";
import Wallet from "./Sub-Routes/WalletRoutes";

import BasicPage from "../Components/BasicPage/BasicPage";
import Simulation from "../Pages/SimulateTradingPlatform/TradingPlatform";
import Alert from "../Pages/Alert/Alert";
import Suggestions from "../Pages/Suggestions/Suggestions";
import Quiz from "../Pages/Quiz/Quiz";
import VerifyUser from "../Pages/User/VerifyUser";
import Signup from "../Pages/Login&Signin/Signup";
import Login from "../Pages/Login&Signin/Login";
import PrivateRoute from "../Components/PrivateRoute";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <App />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: <PrivateRoute><App /></PrivateRoute>,
    },
    {
      path: "/admin/*",
      element: <PrivateRoute><Admin /></PrivateRoute>,
    },
    {
      path: "/watchlist/*",
      element: <PrivateRoute><Watchlist /></PrivateRoute>,
    },
    {
      path: "/portfolio/*",
      element: <PrivateRoute><Portfolio /></PrivateRoute>,
    },
    {
      path: "/forum/*",
      element: <PrivateRoute><Forum /></PrivateRoute>,
    },
    {
      path: "/summary/*",
      element: <PrivateRoute><Summary /></PrivateRoute>,
    },
    {
      path: "/education/*",
      element: <PrivateRoute><Education /></PrivateRoute>,
    },
    {
      path: "/news/*",
      element: <PrivateRoute><News /></PrivateRoute>,
    },
    {
      path: "/wallet/*",
      element: <PrivateRoute><Wallet /></PrivateRoute>,
    },
    {
      path: "/settings",
      element: <PrivateRoute><BasicPage /></PrivateRoute>,
    },
    {
      path: "/simulate",
      element: <PrivateRoute><Simulation /></PrivateRoute>,
    },
    {
      path: "/alert",
      element: <PrivateRoute><Alert /></PrivateRoute>,
    },
    {
      path: "/suggestion",
      element: <PrivateRoute><Suggestions /></PrivateRoute>,
    },
    {
      path: "/quiz",
      element: <PrivateRoute><Quiz /></PrivateRoute>,
    },
    {
      path: "/verify",
      element: <VerifyUser />,
    },
  ]);

  return <RouterProvider router={router} />;
}
