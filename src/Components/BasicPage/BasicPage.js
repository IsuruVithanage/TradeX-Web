import React from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import TopNavBar from "./TopNavBar/TopNavBar";
import PageContainer from "./PageContainer/PageContainer";

export default function BasicPage(props) {
  return (
    <div>
        <SideNavBar/>
        <TopNavBar>{props.TopNavTabs}</TopNavBar>
        <PageContainer>{props.children}</PageContainer>
    </div>
  )
}