import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage'
import { VscSearchStop } from "react-icons/vsc";
import "./NotFound.css"

export default function NotFound() {
    return (
        <BasicPage>
            <div className='page-not-found-container'>
                <div className='unauthorized-sub-container'>
                    <span><VscSearchStop/></span>
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>The page you are requesting is not found</p>	
                </div>
            </div>
        </BasicPage>
    )
}
