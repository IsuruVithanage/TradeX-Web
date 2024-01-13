import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideNavIcon(props) {

  const curretLocation = useLocation().pathname;

  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    setActiveIcon(curretLocation);
  }, [curretLocation]);

  return (
    <Link
        to={props.url}
        className={`nav-link ${activeIcon === props.url ? "active" : ""}`}>
        {props.children}
    </Link>
  );
}
