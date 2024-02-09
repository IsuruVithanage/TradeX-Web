import React from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import TopNavBar from "./TopNavBar/TopNavBar";
import './BasicPage.css'

export default function BasicPage(props) {
  return (
    <div>
        <SideNavBar/>
        <TopNavBar tabs={props.tabs} subPages={props.subPages}/>
        <div className='main-container'>
            {props.children}
        </div>
    </div>
  )
}