import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import crypto from "../../Assets/Images/crypto.png";
import axios from "axios";
import "./EducationItems.css";



const EducationItem = (props) => {
  const { eduId, userId, title, description, image, url, isFavorite } = props
  const [isHeartFilled, setIsHeartFilled] = useState(isFavorite);

  const handleHeartClick = () => {
    axios.post("http://localhost:8009/education/favorite",{
      eduId, userId, isFavorite: !isHeartFilled
    })
    .then((res) => {
      setIsHeartFilled(!isHeartFilled);
    })
    .catch((error) => {
      console.log("error in favorite");
    })
    
  };

  return (
    <div style={{ display: "flex" }}><div className="education-container">
      <div className="img-container">
        <img src={image ? image : crypto} alt="..." />
      </div>
      <div className="desc-container">
        <div style={{ display: "flex" }}>
          <div className="news-header-container">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <h1>{title}</h1>
            </a>
            <p>
              {description
                ? description.slice(0, 90)
                : "Cryptocurrency is digital money that doesn't require a bank or financial institution to verify transactions and can be used for purchases or as an investment."}
            </p>
          </div>
          <div className="favorite-icon-container" onClick={handleHeartClick}>
            {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EducationItem;