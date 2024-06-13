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
import Detailed from "../Components/Questionbar/Detailed";
import Quiz from "../Pages/Quiz/Quiz";
import VerifyUser from "../Pages/User/VerifyUser";
import Signup from "../Pages/Login&Signin/Signup";
import Login from "../Pages/Login&Signin/Login";
import Favorites from "../Pages/Forum/Favorites";

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
      element: <Admin />,
    },
    {
      path: "/watchlist/*",
      element: <Watchlist />,
    },
    {
      path: "/portfolio/*",
      element: <Portfolio />,
    },
    {
      path: "/forum/*",
      element: <Forum />,
    },
    {
      path: "/summary/*",
      element: <Summary />,
    },
    {
      path: "/education/*",
      element: <Education />,
    },
    {
      path: "/news/*",
      element: <News />,
    },
    {
      path: "/wallet/*",
      element: <Wallet />,
    },
    {
      path: "/settings",
      element: <BasicPage />,
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
      path: "/Questionbar/Detailed/:id",
      element: <Detailed />,
    },

    {
      path: "/quiz",
      element: <Quiz />,
    },
    // {
    //     path: "/profile",
    //     element: <UserProfileTab />,
    // },
    {
      path: "/verify",
      element: <VerifyUser />,
    },
  ]);

  return <RouterProvider router={router} />;
}
