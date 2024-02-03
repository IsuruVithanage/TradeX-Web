import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './ButtonSet.css';

export default function ButtonSet(props) {

    const [isBtnOne, setIsBtnOne] = useState(true);
    const [isBtnTwo, setIsBtnTwo] = useState(false);
    const [isBtnThree, setIsBtnThree] = useState(false);

    const handleButtonClick = (userState) => {
        if (userState === 1) {
            setIsBtnOne(true);
            setIsBtnTwo(false);
            setIsBtnThree(false);
        } else if (userState === 2) {
            setIsBtnTwo(true);
            setIsBtnOne(false);
            setIsBtnThree(false);
        } else if (userState === 3) {
            setIsBtnThree(true);
            setIsBtnOne(false);
            setIsBtnTwo(false);
        }
    };

    return (
        <>
            <div className="top-button-container">
                <nav className="links-container">
                    {props.priceLimits.map((buttonName, index) => (
                        <button
                            key={index}
                            className={`btn-set-link ${
                                (index === 0 && isBtnOne) || (index === 1 && isBtnTwo) || (index === 2 && isBtnThree) ? "active" : ""
                            }`}
                            onClick={() => handleButtonClick(index + 1)}
                        >
                            {buttonName}
                        </button>
                    ))}
                </nav>

            </div>
        </>
    )
}