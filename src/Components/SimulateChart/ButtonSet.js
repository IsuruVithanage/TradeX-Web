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
            props.setOrderCatagory('Limit');
            setIsBtnTwo(false);
            setIsBtnThree(false);
        } else if (userState === 2) {
            setIsBtnTwo(true);
            props.setOrderCatagory('Market');
            setIsBtnOne(false);
            setIsBtnThree(false);
        } else if (userState === 3) {
            setIsBtnThree(true);
            props.setOrderCatagory('Stop Limit');
            setIsBtnOne(false);
            setIsBtnTwo(false);
        }
    };

    return (
        <>
            <div className="top-button-container">
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

            </div>
        </>
    )
}