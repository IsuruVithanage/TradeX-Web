import React, { lazy, Suspense } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import Loading from './Components/Loading/Loading';
import userReducer from './Features/User';
import authReducer from './Features/authSlice'; 
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
        <Router/>
    </Suspense>
);
