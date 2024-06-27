import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import EducationItem from "../../Components/EducationResources/EducationItems";
import "./Education.css";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";

function Education() {

  const [educationItems, setEducationItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId=1;

  useEffect(() => {
    setIsLoading(true);

    axios.get("http://localhost:8009/education/getFavEduResources/" + userId)
    .then((res) => {
      setEducationItems(res.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("error getting eduResources",error);
      setEducationItems([]);
      setIsLoading(false);
    });

  }, []);

  return (
    <BasicPage
      isLoading={isLoading}
      tabs={[
        { label: "All", path: "/education" },
        { label: "Favorite", path: "/education/Favorites" },
      ]}
    >
      <SidePanelWithContainer
        header="Favorites"
        style={{height:"91vh"}}
        sidePanel={
          <div className="video-list">
          <div style={{ display: "block" }}>
            <h4>Market Analysis</h4>
            <ul>
              <li>Technical Analysis</li>
              <li>Fundamental Analysis</li>
              <li>Market Trends and Predictions</li>
            </ul>
            <h4>Market Analysis</h4>
            <ul>
              <li>Technical Analysis</li>
              <li>Fundamental Analysis</li>
              <li>Market Trends and Predictions</li>
            </ul>
    
          </div>
        </div>
        }>

          <div className="search">
            <Input type={"search"} placeholder={"serach"} />
          </div>
          <div className="education-resources">
        
          {educationItems.map((item, index) => (
            <EducationItem key={index} userId={userId} {...item} />
          ))}
        </div>

        </SidePanelWithContainer>
    </BasicPage>
  );
}

export default Education;
