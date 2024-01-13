import React from 'react';
import './TopNavBar.css';

export default function TopNavBar(props) {
  return (
    <div className="top-navbar">
        <nav className="links-container">
            {props.children}
        </nav>
    </div>
  )
}
