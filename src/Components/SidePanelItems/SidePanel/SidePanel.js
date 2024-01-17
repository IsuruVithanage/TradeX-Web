import React from 'react'
import './SidePanel.css'

export function SidePanel(props) {
  return (
    <div className='side-panel'>
        <p className='side-panel-header'>{props.header}</p>
        <hr className='bar'/>
        {props.children}
    </div>
  )
}

export function ContainerWithSidePanel(props) {
  return (
    <div className='container-with-side-panel'>
        {props.children}
    </div>
  )
}
