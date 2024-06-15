import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './Components/Loading/Loading';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "./Features/User";
import authReducer from './Features/authSlice';
import './Pages/Summary/globals'
import './index.css';

const Router = lazy(() => import('./Routes/Router'));
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
});

export { store };

root.render(
    <Suspense fallback={<Loading />}>
        <Provider store={store}>
            <Router /> 
        </Provider>
    </Suspense>
);
