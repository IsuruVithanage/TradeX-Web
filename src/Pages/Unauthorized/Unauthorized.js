import React from 'react'
import BasicPage from '../../Components/Layouts/BasicPage/BasicPage'
import { LiaUserTimesSolid } from "react-icons/lia";
import "./Unauthorized.css"

export default function Unauthorized() {
    return (
        <BasicPage>
            <div className='unauthorized-container'>
                <div className='unauthorized-sub-container'>
                    <span><LiaUserTimesSolid/></span>
                    <h1>401</h1>
                    <h2>Unauthorized</h2>
                    <p>You are not authorized to view this page.</p>	
                </div>
            </div>
        </BasicPage>
    )
}
