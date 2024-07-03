import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Simulation from "../Pages/SimulateTradingPlatform/TradingPlatform";
import Alert from "../Pages/Alert/Alert";
import Suggestions from "../Pages/Suggestions/Suggestions";
import Quiz from "../Pages/Quiz/Quiz";
import VerifyUser from "../Pages/User/VerifyUser";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/NotFound/NotFound"

import AdminRoutes from "./Sub-Routes/AdminRoutes";
import WatchlistRoutes from "./Sub-Routes/WatchlistRoutes";
import PortfolioRoutes from "./Sub-Routes/PortfolioRoutes";
import ForumRoutes from "./Sub-Routes/ForumRoutes";
import SummaryRoutes from "./Sub-Routes/SummaryRoutes";
import EducationRoutes from "./Sub-Routes/EducationRoutes";
import NewsRoutes from "./Sub-Routes/NewsRoutes";
import WalletRoutes from "./Sub-Routes/WalletRoutes";

import PrivateRouteHandler from "./PrivateRouteHandler";
import PublicRouteHandler from "./PublicRouteHandler"



export default function Router() {
    const publicRoutes = wrapWithPublicRouteHandler([
        {
            path: "/login",
            element: <Login />,
        },
        { 
            path: "/", 
            element: <Home />, 
        }
    ]);



    const privateRoutes = wrapWithPrivateRouteHandler([
        { 
            path: "/verify", 
            element: <VerifyUser />, 
            permittedRole: "OnlyUser" 
        },
        { 
            path: "/admin/*", 
            element: <AdminRoutes />, 
            permittedRole: "Admin" 
        },
        { 
            path: "/watchlist/*", 
            element: <WatchlistRoutes />, 
            permittedRole: "User" 
        },
        { 
            path: "/portfolio/*", 
            element: <PortfolioRoutes />, 
            permittedRole: "Trader" 
        },
        { 
            path: "/forum/*", 
            element: <ForumRoutes />, 
            permittedRole: "Trader" 
        },
        { 
            path: "/summary/*", 
            element: <SummaryRoutes />, 
            permittedRole: "User" 
        },
        { 
            path: "/education/*", 
            element: <EducationRoutes />, 
            permittedRole: "User" 
        },
        { 
            path: "/news/*", 
            element: <NewsRoutes />, 
            permittedRole: "User" 
        },
        { 
            path: "/wallet/*", 
            element: <WalletRoutes />, 
            permittedRole: "Trader" 
        },
        { 
            path: "/simulate", 
            element: <Simulation />, 
            permittedRole: "Trader" 
        },
        { 
            path: "/alert", 
            element: <Alert />, 
            permittedRole: "User" 
        },
        { 
            path: "/suggestion", 
            element: <Suggestions />, 
            permittedRole: "Trader" 
        },
        { 
            path: "/quiz", 
            element: <Quiz />, 
            permittedRole: "User" 
        },
        {
            path: "*",
            element: <NotFound />,
            permittedRole: "User" 
        }
    ]);    


    const router = createBrowserRouter(privateRoutes.concat(publicRoutes));
    return <RouterProvider router={router} />;
}




function wrapWithPublicRouteHandler(routes) {
    return routes.map(route => ({
        path: route.path,
        element: (
            <PublicRouteHandler
                behavior={route.behavior}>
                {route.element}
            </PublicRouteHandler>
        ),
    }));
}




function wrapWithPrivateRouteHandler(routes) {
    return routes.map(route => ({
        path: route.path,
        element: (
            <PrivateRouteHandler
                permittedRole={route.permittedRole}>
                {route.element}
            </PrivateRouteHandler>
        ),
    }));
}