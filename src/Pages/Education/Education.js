import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import EducationResources from "../../Components/EducationResources/EducationItems";
import "./Education.css";

function Education() {
  return (
    <BasicPage
      tabs={[
        { label: "All", path: "/education" },
        { label: "Favorite", path: "/education/Favorites" },
      ]}
    >
      <div className="search">
        <Input type={"search"} placeholder={"serach"} />
      </div>
      <div style={{display:"flex"}}><EducationResources/>
      <div className="video-list">
        <div style={{display:"block"}}><h2 style={{color:"white", margin:"10px"}}>Video List</h2>
        <h4>Market Analysis</h4><ul>
  <li>Technical Analysis</li>
  <li>Fundamental Analysis</li>
  <li>Market Trends and Predictions</li>
</ul> 
<h4>Market Analysis</h4><ul>
  <li>Technical Analysis</li>
  <li>Fundamental Analysis</li>
  <li>Market Trends and Predictions</li>
</ul> 
<h4>Market Analysis</h4><ul>
  <li>Technical Analysis</li>
  <li>Fundamental Analysis</li>
  <li>Market Trends and Predictions</li>
</ul></div>
        </div></div>
    </BasicPage>
  );
}

export default Education;
