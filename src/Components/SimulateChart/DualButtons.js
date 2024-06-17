import React, {useState} from "react";
import './DualButtons.css';

export default function DualButtons(props) {

    const [isBtnOne, setIsBtnOne] = useState(true);
    const [isBtnTwo, setIsBtnTwo] = useState(false);

    const handleButtonClick = (userState) => {
        if (userState === 1) {
            setIsBtnOne(true);
            setIsBtnTwo(false);
        } else if (userState === 2) {
            setIsBtnTwo(true);
            setIsBtnOne(false);
        }
    };


    return (
        <>
            <div className="dual-button-container">
                <nav className="btn-container">
                    <button className={`btn-nav-link b1 ${(isBtnOne ? "active" : "")}`} onClick={() => handleButtonClick(1)}>
                        {props.buttonNames[0]}
                    </button>
                    <button className={`btn-nav-link b2 ${(isBtnTwo ? "active" : "")}`} onClick={() => handleButtonClick(2)}>
                        {props.buttonNames[1]}
                    </button>

                </nav>

            </div>
        </>
    )
}