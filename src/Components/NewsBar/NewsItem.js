import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; 
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'; 
import image from '../../Assets/Images/image.jpg'; 
import './NewsItem.css'; 
import axios from 'axios'; 


const NewsItem = ({ title, description, src, url,newsId }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const userId = 1;

  // Event handler for toggling heart icon
  const handleHeartClick = () => {
    console.log("click");
      axios.post(
        "http://localhost:8008/news/fav/" + !isHeartFilled,
        {
          newsId,userId
        }
      ).then (res =>{
        setIsHeartFilled(!isHeartFilled);
        console.log(res.data)
      }) 
      .catch(error => {
        console.log(error);
      });
    
  };

  // Event handler for incrementing like count
  const handleLikeClick = () => {
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
  };

  // Event handler for incrementing dislike count
  const handleDislikeClick = () => {
    setDislikeCount((prevDislikeCount) => prevDislikeCount + 1);
  };

  // Render the component
  return (
    <div className='newsbar-container'> 
      {/* Container for the news image */}
      <div className='img-container'>
        <img src={src ? src : image} alt="..." /> 
      </div>
      
      <div className='desc-container'>
        <div style={{ display: 'flex' }}>
          <div className='news-header-container'>
            {/* Link to the full article */}
            <a href={url} target="_blank" rel="noopener noreferrer">
              <h1>{title}</h1> {/* Display the news title */}
            </a>
            {/* Display the news description */}
            <p>{description ? description.slice() : "In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}</p>
          </div>

          <div className='favorite-icon-container' onClick={handleHeartClick}>
            {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>

        <div className='footer-bar'>
          <div className='like-icon-container'>
            <div onClick={handleLikeClick}>
              {likeCount} <AiOutlineLike />
            </div>
            <div onClick={handleDislikeClick}>
              {dislikeCount} <AiOutlineDislike />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem; 
