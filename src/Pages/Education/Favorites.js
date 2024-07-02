import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import axios from "axios";
import Input from "../../Components/Input/Input";
import EducationItem from "../../Components/EducationResources/EducationItems";
import "./Education.css";
import { getUser } from "../../Storage/SecureLs";

function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const userId = getUser().id;

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8009/education/getFavEduResources/" + userId)
      .then((res) => {
        setEducationItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error getting eduResources", error);
        setEducationItems([]);
        setIsLoading(false);
      });
  }, []);

  const filteredEducationItems = educationItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BasicPage
      isLoading={isLoading}
      tabs={[
        { label: "All", path: "/education" },
        { label: "Favorite", path: "/education/Favorites" },
      ]}
    >
      <div className="search">
        <Input
          type={"search"}
          placeholder={"serach"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="education-resources">
        {filteredEducationItems.map((item, index) => (
          <EducationItem
            key={index}
            userId={userId}
            {...item}
            deleteItem={false}
          />
        ))}
      </div>
    </BasicPage>
  );
}

export default Education;
