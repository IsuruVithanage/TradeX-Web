import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import image from '../../Assets/Images/image.jpg';
import './NewsItem.css';

const NewsItem = ({ title, description, src, url }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled((prevIsHeartFilled) => !prevIsHeartFilled);
  };

  return (
    <div className='newsbar-container'>
      <div className='img-container'>
        <img src={src ? src : image} alt="..." />
      </div>
      <div className='desc-container'>
        <div style={{ display: 'flex' }}>
          <div className='news-header-container'>
            <a href={url}>
              <h1>{title}</h1>
            </a>
            <p>{description ? description.slice(0, 90) : "In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}</p>
          </div>
          <div className='favorite-icon-container' onClick={handleHeartClick}>
            {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>

        <div className='like-icon-container'>
          <AiOutlineDislike />
          <AiOutlineLike />
        </div>

        <div className='foter-bar'>
          <p>1 day</p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
