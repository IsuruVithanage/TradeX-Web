import React from "react";
import TopNavBar from "./TopNavBar/TopNavBar";
import SideNavBar from "./SideNavBar/SideNavBar";
import { PageLoading } from "../Loading/Loading";
import "./BasicPage.css";

export default function BasicPage(props) {
  return (
    <div>
      {props.sideNavBar !== false && <SideNavBar />}

      {props.TopNavBar !== false && <TopNavBar {...props} />}

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
