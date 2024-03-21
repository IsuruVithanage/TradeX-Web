import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import crypto from "../../Assets/Images/crypto.png";
import "./EducationItems.css";
import { Flex } from "antd";

const EducationItem = ({ title, description, src, url }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled((prevIsHeartFilled) => !prevIsHeartFilled);
  };

  return (
    <div style={{ display: "flex" }}><div className="education-container">
      <div className="img-container">
        <img src={src ? src : crypto} alt="..." />
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
