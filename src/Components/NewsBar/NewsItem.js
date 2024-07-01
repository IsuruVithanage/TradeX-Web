import React, { useState, useEffect } from "react";
import defaultImage from "../../Assets/Images/image.jpg";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  MdThumbUp,
  MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
} from "react-icons/md";
import "./NewsItem.css";
import { showMessage } from "../Message/Message";

const NewsItem = (props) => {
  const {
    newsId,
    url,
    title,
    description,
    image,
    isFavorite,
    isLiked,
    isDisliked,
    userId,
    publishedAt,
  } = props;
  const [isHeartFilled, setIsHeartFilled] = useState(isFavorite || false);
  const [isLike, setIsLike] = useState(isLiked || false);
  const [isDislike, setIsDislike] = useState(isDisliked || false);
  const [likeCount, setLikeCount] = useState(props.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(props.dislikeCount || 0);

  useEffect(() => {
    startWebSocket();
  }, []);

  // Event handler for toggling heart icon
  const handleHeartClick = () => {
    axios
      .post("http://localhost:8008/news/fav/" + !isHeartFilled, {
        newsId,
        userId,
      })
      .then((res) => {
        setIsHeartFilled(!isHeartFilled);
        if (!isHeartFilled) {
          showMessage("success", "Added to Favourite");
        }
      })
      .catch((error) => {
        showMessage("success", error);
      });
  };

  const startWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8082");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type) {
        console.log("data", data);
        if (data.type === "liked" && data.likeDetail.newsId === newsId) {
          setLikeCount(parseInt(data.likeDetail.likeCount.likeCount));
        } else if (
          data.type === "disLiked" &&
          data.disLikeDetail.newsId === newsId
        ) {
          console.log("dislike", data.disLikeDetail.likeCount.dislikeCount);
          setDislikeCount(parseInt(data.disLikeDetail.likeCount.dislikeCount));
        }
      }
    };
    return () => {
      ws.close();
    };
  };

  // Event handler for incrementing like count
  const handleLikeClick = () => {
    if (isDislike && !isLike) {
      dislike(false);
    }

    like(!isLike);
  };

  // Event handler for incrementing dislike count
  const handleDislikeClick = () => {
    if (!isDislike && isLike) {
      like(false);
    }

    dislike(!isDislike);
  };

  const like = async (likeStatus) => {
    axios
      .post("http://localhost:8008/news/like", {
        newsId,
        userId,
        isLike: likeStatus,
      })
      .then((res) => {
        setLikeCount(parseInt(res.data.likeCount, 10) || 0);
        setIsLike(likeStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dislike = async (dislikeStatus) => {
    axios
      .post("http://localhost:8008/news/dislike", {
        newsId,
        userId,
        isDislike: dislikeStatus,
      })
      .then((res) => {
        setDislikeCount(parseInt(res.data.dislikeCount, 10) || 0);
        setIsDislike(dislikeStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Render the component
  return (
    <div className="newsbar-container">
      {/* Container for the news image */}
      <div className="img-container">
        <img src={image ? image : defaultImage} alt="..." />
      </div>

      <div className="desc-container">
        <div style={{ display: "flex" }}>
          <div className="news-header-container">
            {/* Link to the full article */}
            <a href={url} target="_blank" rel="noopener noreferrer">
              <h1>{title.slice(0, 90)}</h1> {/* Display the news title */}
            </a>
            {/* Display the news description */}
            <p>
              {description
                ? description.slice()
                : "In a rare discovery, scientists reveal the oldest piece of fossilized skin - The Washington Post,"}
            </p>
          </div>

          <div className="favorite-icon-container" onClick={handleHeartClick}>
            {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>

        <div className="footer-bar">
          <div>{new Date(publishedAt).toLocaleDateString("en-GB")}</div>
          <div className="like-icon-container">
            <div onClick={handleLikeClick}>
              {likeCount} {isLike ? <MdThumbUp /> : <MdOutlineThumbUp />}
            </div>
            <div onClick={handleDislikeClick}>
              {dislikeCount}{" "}
              {isDislike ? <MdThumbDown /> : <MdOutlineThumbDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
