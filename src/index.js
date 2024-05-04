import './index.css';
import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Loading from './Components/Loading/Loading';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import Firebase from './Pages/Alert/firebase';
import userReducer from "./Features/User";
import './Pages/Summary/globals'

const Router = lazy(() => import("./Routes/Router"));
const root = ReactDOM.createRoot(document.getElementById('root'));
const firebase = new Firebase();


const store = configureStore({
    reducer: {
        user: userReducer,
    }
});


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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();