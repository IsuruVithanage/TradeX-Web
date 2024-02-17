import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import wallet from '../../../Assets/Images/wallet.png'
import './TopNavBar.css';

export default function TopNavBar(props) {
  const userName = "Kamal Silva";

  const currentLocation = useLocation().pathname + useLocation().search;
  
  const [activeLink, setActiveLink] = useState(currentLocation);

  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

  const [activePage, setActivePage] = useState(props.subPages ? props.subPages.labels[0] : undefined);
 
  const handleProfileIconClick = () => {
    setProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleSubPagesClick = (label) => {
    setActivePage(label);
    props.subPages.onClick &&
    props.subPages.onClick(label);
  }

  const active = (path) => {
    return  (path === activeLink) ? "active" : "";
  };

  useEffect(() => {
    setActiveLink(currentLocation);
  }, [currentLocation]); 

  return (
    <div>
      { props.sideNavBar === false && props.icon !== false &&
          <div className="top-navbar-iconholder">
              { props.icon ? props.icon :
              <img src={wallet} alt="Logo" width={45} /> }
          </div>
      }
      <div className={`top-navbar ${ props.icon === false && "full-width" }`}>
          <nav className="links-container">
              {(props.tabs) && props.tabs.map((tab) => (
                <Link key={tab.label} to={tab.path} className="top-link">
                  <span className={`top-nav-link ${active(tab.path)}`}>
                    {tab.label}
                  </span>
                </Link>
              ))}  

              {(props.subPages) && props.subPages.labels.map((label) => (
                  <span 
                    key={label}
                    className={`top-nav-link ${(activePage === label) ? "active" : ""}`} 
                    onClick={ () => handleSubPagesClick(label)}>
                    {label}
                  </span>
              ))}  
          </nav>

          <div className="profile-icon-containar" onClick={handleProfileIconClick}>
              <span className="user-name">{userName}</span>
              <BiSolidUserRectangle className="profile-icon" /> 
          </div>
      </div>
      
      <div className={`profile-menu ${isProfileMenuVisible? "active": ""}`}>
        <span>{userName}</span>
      </div>
    </div>
  )
}