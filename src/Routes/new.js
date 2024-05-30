import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "../Components/Loading/Loading";

const App = lazy(() => import("../App"));
const Watchlist = lazy(() => import("./Sub-Routes/WatchlistRoutes"));
const Portfolio = lazy(() => import("./Sub-Routes/PortfolioRoutes"));
const Forum = lazy(() => import("./Sub-Routes/ForumRoutes"));
const Summary = lazy(() => import("./Sub-Routes/SummaryRoutes"));
const Education = lazy(() => import("./Sub-Routes/EducationRoutes"));
const News = lazy(() => import("./Sub-Routes/NewsRoutes"));
const Wallet = lazy(() => import("./Sub-Routes/WalletRoutes"));
const BasicPage = lazy(() => import("../Components/BasicPage/BasicPage"));
const Simulation = lazy(() =>
  import("../Pages/SimulateTradingPlatform/TradingPlatform")
);
const Alert = lazy(() => import("../Pages/Alert/Alert"));
const Suggestions = lazy(() => import("../Pages/Suggestions/Suggestions"));
const Detailed = lazy(() => import("../Components/Questionbar/Detailed"));
const Quiz = lazy(() => import("../Pages/Quiz/Quiz"));
const UserProfileTab = lazy(() => import("../Pages/User/UserProfileTab"));
const VerifyUser = lazy(() => import("../Pages/User/VerifyUser"));

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      ),
    },
    {
      path: "/watchlist/*",
      element: (
        <Suspense fallback={<Loading />}>
          <Watchlist />
        </Suspense>
      ),
    },
    {
      path: "/portfolio/*",
      element: (
        <Suspense fallback={<Loading />}>
          <Portfolio />
        </Suspense>
      ),
    },
    {
      path: "/forum/*",
      element: (
        <Suspense fallback={<Loading />}>
          <Forum />
        </Suspense>
      ),
    },
    {
      path: "/summary/*",
      element: (
        <Suspense fallback={<Loading />}>
          <Summary />
        </Suspense>
      ),
    },
    {
      path: "/education/*",
      element: (
        <Suspense fallback={<Loading />}>
          <Education />
        </Suspense>
      ),
    },
    {
      path: "/news/*",
      element: (
        <Suspense fallback={<Loading />}>
          <News />
        </Suspense>
      ),
    },
    {
      path: "/wallet/*",
      element: (
        <Suspense fallback={<Loading />}>
          <Wallet />
        </Suspense>
      ),
    },
    {
      path: "/settings",
      element: (
        <Suspense fallback={<Loading />}>
          <BasicPage />
        </Suspense>
      ),
    },
    {
      path: "/simulate",
      element: (
        <Suspense fallback={<Loading />}>
          <Simulation />
        </Suspense>
      ),
    },
    {
      path: "/alert",
      element: (
        <Suspense fallback={<Loading />}>
          <Alert />
        </Suspense>
      ),
    },
    {
      path: "/suggestion",
      element: (
        <Suspense fallback={<Loading />}>
          <Suggestions />
        </Suspense>
      ),
    },
    {
      path: "/Questionbar/Detailed",
      element: (
        <Suspense fallback={<Loading />}>
          <Detailed />
        </Suspense>
      ),
    },

    {
      path: "/quiz",
      element: (
        <Suspense fallback={<Loading />}>
          <Quiz />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<Loading />}>
          <UserProfileTab />
        </Suspense>
      ),
    },
    {
      path: "/verify",
      element: (
        <Suspense fallback={<Loading />}>
          <VerifyUser />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
