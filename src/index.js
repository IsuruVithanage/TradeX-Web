import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './Components/Loading/Loading';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "./Features/User";
import './Pages/Summary/globals'
import './index.css';

const Router = lazy(() => import("./Routes/Router"));
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: { user: userReducer }});


root.render(
    // <React.StrictMode>
    //   <RouterProvider router={router}/>
    // </React.StrictMode>
    <Suspense fallback={<Loading/>}>
        <Provider store={store}>
            <Router /> 
        </Provider>
    </Suspense>
);