import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import './TopNavBar.css';

export default function TopNavBar(props) {
  const userName = "Kamal Silva";

  const currentLocation = useLocation().pathname;
  
  const [activeLink, setActiveLink] = useState(currentLocation);

  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleProfileIconClick = () => {
    setProfileMenuVisible(!isProfileMenuVisible);
  };

  useEffect(() => {
    setActiveLink(currentLocation);
  }, [currentLocation]); 

  const active = (path) => {
    return  (path === activeLink) ? "active" : "";
  };

  return (
    <>
      <div className="top-navbar">
          <nav className="links-container">
              {(props.tabs) && props.tabs.map((tab) => (
                <Link to={tab.path}>
                  <span className={`top-nav-link ${active(tab.path)}`}>
                    {tab.label}
                  </span>
                </Link>
              ))}  
          </nav>

          <div className="profile-icon-containar" onClick={handleProfileIconClick}>
              <span className="user-name">{userName}</span>
              <BiSolidUserRectangle 
                className="profile-icon" 
              /> 
          </div>
      </div>
      
      <div className={`profile-menu ${isProfileMenuVisible? "active": ""}`}>
        <span>{userName}</span>
      </div>
    </>
  )
}