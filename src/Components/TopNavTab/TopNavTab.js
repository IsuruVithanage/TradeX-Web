import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopNavTab(props) {
    const curretLocation = useLocation().pathname;

    const [activeLink, setActiveLink] = useState(null);
  
    useEffect(() => {
      setActiveLink(curretLocation);
    }, [curretLocation]);  

  return (
    <Link to={props.url}>
      <span className={`top-nav-link ${activeLink === props.url ? "active" : ""}`}>
        {props.label}
      </span>
    </Link>
  )
}
