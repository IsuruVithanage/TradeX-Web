import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Simulation from "../Pages/SimulateTradingPlatform/TradingPlatform";
import Alert from "../Pages/Alert/Alert";
import Suggestions from "../Pages/Suggestions/Suggestions";
import Quiz from "../Pages/Quiz/Quiz";
import VerifyUser from "../Pages/User/VerifyUser";
import Signup from "../Pages/Login&Signin/Signup";
import Login from "../Pages/Login&Signin/Login";

import AdminRoutes from "./Sub-Routes/AdminRoutes";
import WatchlistRoutes from "./Sub-Routes/WatchlistRoutes";
import PortfolioRoutes from "./Sub-Routes/PortfolioRoutes";
import ForumRoutes from "./Sub-Routes/ForumRoutes";
import SummaryRoutes from "./Sub-Routes/SummaryRoutes";
import EducationRoutes from "./Sub-Routes/EducationRoutes";
import NewsRoutes from "./Sub-Routes/NewsRoutes";
import WalletRoutes from "./Sub-Routes/WalletRoutes";



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
      element: <App />,
    },
    {
      path: "/admin/*",
      element: <AdminRoutes />,
    },
    {
      path: "/watchlist/*",
      element: <WatchlistRoutes />,
    },
    {
      path: "/portfolio/*",
      element: <PortfolioRoutes />,
    },
    {
      path: "/forum/*",
      element: <ForumRoutes />,
    },
    {
      path: "/summary/*",
      element: <SummaryRoutes />,
    },
    {
      path: "/education/*",
      element: <EducationRoutes />,
    },
    {
      path: "/news/*",
      element: <NewsRoutes />,
    },
    {
      path: "/wallet/*",
      element: <WalletRoutes />,
    },
    {
      path: "/simulate",
      element: <Simulation />,
    },
    {
      path: "/alert",
      element: <Alert />,
    },
    {
      path: "/suggestion",
      element: <Suggestions />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/verify",
      element: <VerifyUser />,
    },
  ]);

  return <RouterProvider router={router} />;
}
