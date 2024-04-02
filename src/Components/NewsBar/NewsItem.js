import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Import heart icons
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'; // Import like and dislike icons
import image from '../../Assets/Images/image.jpg'; // Import default image
import './NewsItem.css'; // Import CSS styles

// Define the NewsItem component
const NewsItem = ({ title, description, src, url }) => {
  // State variables for managing like button state and counts
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  // Event handler for toggling heart icon
  const handleHeartClick = () => {
    setIsHeartFilled((prevIsHeartFilled) => !prevIsHeartFilled);
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
    <div className='newsbar-container'> {/* Container for the news item */}
      {/* Container for the news image */}
      <div className='img-container'>
        <img src={src ? src : image} alt="..." /> {/* Display the news image */}
      </div>
      
      {/* Container for the news description and interaction elements */}
      <div className='desc-container'>
        <div style={{ display: 'flex' }}>
          {/* Container for the news header */}
          <div className='news-header-container'>
            {/* Link to the full article */}
            <a href={url} target="_blank" rel="noopener noreferrer">
              <h1>{title}</h1> {/* Display the news title */}
            </a>
            {/* Display the news description */}
            <p>{description ? description.slice(0, 90) : "In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}</p>
          </div>

          {/* Container for the favorite icon */}
          <div className='favorite-icon-container' onClick={handleHeartClick}>
            {/* Display the heart icon (filled or outline) based on state */}
            {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>

        {/* Footer bar for like and dislike icons */}
        <div className='footer-bar'>
          {/* Container for the like and dislike icons */}
          <div className='like-icon-container'>
            {/* Display the like icon and count */}
            <div onClick={handleLikeClick}>
              {likeCount} <AiOutlineLike />
            </div>
            {/* Display the dislike icon and count */}
            <div onClick={handleDislikeClick}>
              {dislikeCount} <AiOutlineDislike />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem; // Export the NewsItem component
