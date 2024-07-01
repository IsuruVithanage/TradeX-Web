import React from 'react'
import './Intro.css'

export default function Intro(props) {
    const { left, image, title } = props;
    return (
        <div className='intro-container' style={props.style}>
            { !left && <img className='intro-image' src={image} alt='image' /> }
            <div className='intro-text-container'>
                <h1 className='intro-title'>{title}</h1>
                <p className='intro-description'>{props.children}</p>
            </div>
            { left && <img className='intro-image' src={image} alt='image' /> }
        </div>
    )
}