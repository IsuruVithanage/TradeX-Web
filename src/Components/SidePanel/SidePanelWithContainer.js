import React from 'react'
import './SidePanelWithContainer.css'

export default function SidePanelWithContainer(props) {
  return (
    <div className='side-panel-and-content-container'>
        <div className='side-container'>
            { props.children }
        </div>

        <div className='side-panel' style={props.style}>
            <p className='side-panel-header'>{props.header}</p>
            <hr className='bar'/>
            { props.sidePanel }
        </div>
    </div>
  )
}
