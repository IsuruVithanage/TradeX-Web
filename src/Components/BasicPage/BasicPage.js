import React, { lazy, Suspense } from "react";
import TopNavBar from "./TopNavBar/TopNavBar";
import './BasicPage.css'

const LazySideNavBar = lazy(() => import("./SideNavBar/SideNavBar"));

export default function BasicPage(props) {
  return (
    <div>
      {props.sideNavBar !== false && (
        <Suspense fallback={<div style={{backgroundColor: "#0E0E0F", width: "6%", height: "100vh"}}/>}>
          <LazySideNavBar />
        </Suspense>
      )}

      <TopNavBar {...props}/>

      <div className={`main-container ${props.sideNavBar === false && 'full-width'}`}>
        {props.children}
      </div>
    </div>
  )
}
