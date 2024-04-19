import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import EducationItem from "../../Components/EducationResources/EducationItems";
import "./Education.css";
import EducationItems from "../../Pages/Education/EduItem.json";

function Education() {

  const [educationItems, setEducationItems] = useState([]);

  useEffect(() => {
    setEducationItems(EducationItems);
  }, []);

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
      <div style={{ display: "flex" }}>
        <div className="education-resources">
        
          {educationItems.map((item, index) => (
            <EducationItem
              key={index}
              title={item.title}
              description={item.description}
              src={item.image}
              url={item.url}
            />
          ))}
        </div>
        <div className="video-list">
          <div style={{ display: "block" }}>
            <h2 style={{ color: "white", margin: "10px" }}>Favorite</h2>
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
      </div>
    </BasicPage>
  );
}

export default Education;
