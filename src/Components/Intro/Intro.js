import React from 'react'

export default function Intro(props) {
    const { image, title, description } = props;
    return (
        <div className='intro-container'>
            <div className='intro-inner-container'>
                { left && <ImgContainer image={image}/> }
                <div className='intro-text-container'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                { right && <ImgContainer image={image}/> }
            </div>
        </div>
    )
}


function ImgContainer({image}){
    return(
        <div className='intro-img-container'>
            <img className='intro-image' src={image} alt='image' />
        </div>
    )
}
