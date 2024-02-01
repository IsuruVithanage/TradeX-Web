import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './ButtonSet.css';

export default function ButtonSet(props) {

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
            <div className="top-button-container">
                <nav className="links-container">
                    {(props.tabs) && props.tabs.map((tab) => (
                        <Link key={tab.path} to={tab.path}>
                  <span className={`top-nav-link ${active(tab.path)}`}>
                    {tab.label}
                  </span>
                        </Link>
                    ))}
                </nav>

            </div>
        </>
    )
}