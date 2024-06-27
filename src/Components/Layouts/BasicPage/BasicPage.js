<<<<<<< HEAD:src/Components/BasicPage/BasicPage.js
import React from "react";
import TopNavBar from "./TopNavBar/TopNavBar";
import SideNavBar from "./SideNavBar/SideNavBar";
import { PageLoading } from "../Loading/Loading";

import "./BasicPage.css";

function BasicPage(props) {
  return (
    <div>
      {props.sideNavBar !== false && <SideNavBar />}
      {props.topNavBar !== false && <TopNavBar {...props} />}

      {props.isLoading && <PageLoading />}
      {props.isLoading && <div className="page-loading-dimmer" />}

      {props.isLoading && <PageLoading />}
      {props.isLoading && <div className="page-loading-dimmer" />}

      <div
        className={`main-container ${
          props.sideNavBar === false && "full-width"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default BasicPage;
=======
import React from "react";
import TopNavBar from "../TopNavBar/TopNavBar";
import SideNavBar from "../SideNavBar/SideNavBar";
import { PageLoading } from "../../Loading/Loading";
import './BasicPage.css'


function BasicPage(props) {
    return (
        <div>
            {props.sideNavBar !== false && <SideNavBar/>}
            {props.topNavBar !== false && <TopNavBar {...props}/>}


            {props.isLoading && <PageLoading/>}
            {props.isLoading && <div className="page-loading-dimmer"/>}


            <div className={
                `main-container 
                ${props.sideNavBar === false && 'full-width'}
                ${props.topNavBar === false && 'full-height'}`
            }>

                {props.children}
            </div>
        </div>
    )
}

export default BasicPage;
>>>>>>> cdde2f59dc332014889ca9e24cd066c500d7f438:src/Components/Layouts/BasicPage/BasicPage.js
