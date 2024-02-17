import React from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import TopNavBar from "./TopNavBar/TopNavBar";
import './BasicPage.css'

export default function BasicPage(props) {
  return (
    <div>
        { props.sideNavBar !== false && <SideNavBar/> }
        <TopNavBar {...props}/>
        <div className={`main-container ${props.sideNavBar === false && 'full-width'}`}>
            {props.children}
        </div>
    </div>
  )
}