import React, {useState, useEffect} from "react";
import './Switch.css';

export default function DualButtons(props) {

    const [selectedButton, setSelectedButton] = useState(props.buttons[0]);

    const selectHandler = (buttonNo) => {
        setSelectedButton(props.buttons[buttonNo]);
        (props.onClick) && props.onClick(props.buttons[buttonNo]);
    }

    return (
        <>
            <div className="switch-container" style={props.style}>
                <span 
                    className={`switch-mover ${selectedButton === props.buttons[1] ? 'right' : ''}`}>
                </span>

                <span 
                    className={`switch-button ${selectedButton === props.buttons[0] ? 'active' : ''}`} 
                    onClick={() => selectHandler(0)} >
                    {props.buttons[0]}
                </span>

                <span 
                    className={`switch-button ${selectedButton === props.buttons[1] ? 'active' : ''}`} 
                    onClick={() => selectHandler(1)}>
                    {props.buttons[1]}
                </span>
            </div>
        </>
    )
}