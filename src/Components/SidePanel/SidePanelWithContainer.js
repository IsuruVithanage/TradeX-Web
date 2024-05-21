import React from 'react';
import './SidePanelWithContainer.css';

export default function SidePanelWithContainer(props) {
    const line = props.line === undefined ? true : props.line;

    return (
        <div className='side-panel-and-content-container'>
            <div className='side-container'>
                {props.children}
            </div>

            <div className='side-panel' style={props.style}>
                <p className='side-panel-header'>{props.header}</p>
                {line && <hr className='line' />}
                {props.sidePanel}
            </div>
        </div>
    );
}
