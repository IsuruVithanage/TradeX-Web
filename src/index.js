import './index.css';
import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './Components/Loading/Loading';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import Firebase from './Pages/Alert/firebase';
import userReducer from "./Features/User";
import './Pages/Summary/globals'

const Router = lazy(() => import("./Routes/Router"));
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: { user: userReducer }});
const firebase = new Firebase(store.getState().user.user.id);


root.render(
    // <React.StrictMode>
    //   <RouterProvider router={router}/>
    // </React.StrictMode>
    <Suspense fallback={<Loading/>}>
        <Provider store={store}>
            <Router firebase={firebase}/>
        </Provider>
    </Suspense>
);