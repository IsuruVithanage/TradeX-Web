import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './Components/Loading/Loading';
import './index.css';


const Router = lazy(() => import('./Routes/Router'));
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Suspense fallback={<Loading />}>
        <Router /> 
    </Suspense>
);
