import "./Detailed.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { showMessage } from "../../Components/Message/Message";
import {
  MdThumbUp,
  MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
} from "react-icons/md";

const socket = io("/", {
  reconnection: true,
});

function Detailed() {
  let { id } = useParams();
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
  ];

  const [question, setQuestion] = useState({});
  const [values, setValues] = useState({
    answerId: null,
    questionId: id,
    username: "",
    userId: 1,
    comment: "",
    likes: 0,
  });
  const [submittedAnswer, setSubmittedAnswer] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const handleDescriptionChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      comment: content,
    }));
  };

  // Event handler for incrementing like count
  const handleLikeClick = () => {
    if (isDislike && !isLike) {
      dislike(false);
    }

    like(!isLike);
  };

  const like = async (likeStatus) => {
    axios
      .post("http://localhost:8010/forum/like", {
        questionId: id,
        userId: 1,
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

  const handleDislikeClick = () => {
    if (isDislike && !isLike) {
      like(false);
    }
    dislike(!isDislike);
  };

  const dislike = async (dislikeStatus) => {
    axios
      .post("http://localhost:8010/forum/dislike", {
        questionId: id,
        userId: 1,
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

  //add favorites
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = async (question) => {
    try {
      const isFav = favorites.some(
        (fav) => fav.questionId === question.questionId
      );

      // Update local state
      setFavorites((prevFavorites) => {
        if (isFav) {
          // Remove from local state
          return prevFavorites.filter(
            (fav) => fav.questionId !== question.questionId
          );
        } else {
          // Add to local state
          return [...prevFavorites, question];
        }
      });

      // Send request to backend to add or remove favorite
      await axios.post("http://localhost:8010/forum/addFavorite", {
        questionId: question.questionId,
        userId: 1,
        title: question.title,
      });
    } catch (error) {
      console.error(
        "Error updating favorite:",
        error.response ? error.response.data : error
      );
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8010/forum/getFavoritesByUserId/${userId}`
      );
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const isFavorite = (questionId) => {
    return favorites.some((fav) => fav.questionId === questionId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8010/answers/saveAnswer",
        values
      );
      console.log("Data added success");
      showMessage("success", "Answer posted", 1.5);
      setSubmittedAnswer([...submittedAnswer, response.data]); // Update submittedAnswer state to display the submitted answer below
    } catch (err) {
      console.log(err);
    }
  };

  const loadQuestions = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8010/forum/getQuestionsByQuestionId/${id}`
      );
      setQuestion(result.data[0]);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8010/answers/getAnswersByQuestionId/${id}`
      );
      setSubmittedAnswer(response.data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  // add likes and dislikes

  // const [postAddLike, setPostAddLike] = useState([]);
  // const [postRemoveLike, setPostRemoveLike] = useState([]);

  // const addLike = async (qid, uid) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8010/forum/addLike/${qid}/${uid}`
  //     );
  //     setPosts(response.data.posts);
  //     // Update the question likes locally for immediate UI feedback
  //     setQuestion((prevQuestion) => ({
  //       ...prevQuestion,
  //       likes: prevQuestion.likes + 1,
  //     }));
  //   } catch (error) {
  //     console.log(error.response ? error.response.data.error : error);
  //   }
  // };

  // useEffect(() => {
  //   socket.on("add-like", (newPosts) => {
  //     setPostAddLike(newPosts);
  //     setPostRemoveLike([]);
  //   });
  //   socket.on("remove-like", (newPosts) => {
  //     setPostRemoveLike(newPosts);
  //     setPostAddLike([]);
  //   });
  // }, []);

  useEffect(() => {
    loadQuestions();
    fetchAnswers();
    fetchFavorites(1);
  }, [id]);

  // let uiPosts =
  //   postAddLike.length > 0
  //     ? postAddLike
  //     : postRemoveLike.length > 0
  //     ? postRemoveLike
  //     : posts;

  return (
    <BasicPage tabs={Tabs}>
      {/* favorite side bar */}
      <SidePanelWithContainer
        style={{ height: "91vh", width: "50vh" }}
        header={
          <div className="header-container">
            <button className="add-question-btn">Add Answer</button>
          </div>
        }
        sidePanel={
          <div>
            {/* Rectangle Box */}
            <div className="container">
              <div className="stats">
                <div className="statItem">
                  Answers
                  <br />
                  22
                </div>
                <div className="statItem">
                  Best Answers
                  <br />
                  71
                </div>
                <br></br>
                {/* <div className="statItem">
                  Best Answers
                  <br />
                  15
                </div>
                <div className="statItem">
                  Users
                  <br />
                  37
                </div> */}
              </div>
            </div>

            <div>
              <div
                className="favorite-header"
                style={{ fontSize: "20px", marginTop: "3rem" }}
              >
                Favorites
              </div>
              <hr className="favorite-separator"></hr>
              {favorites.map((fav) => (
                <p key={fav.id} className="sub-title">
                  {fav.title}
                </p>
              ))}
            </div>
          </div>
        }
      >
        <div>
          {/* question explain */}
          <div className="ques">
            {question && (
              <>
                <h3>{question.title}</h3>
                <br />
                <p>{question.description}</p>

                {/* add like & dislike */}
                {/* <AiOutlineLike
                  className="like-button"
                  onClick={() => addLike(question.questionId, 1)}
                />
                <AiOutlineDislike className="dislike-button" /> */}
                <div className="prefer-buttons">
                  <div onClick={handleLikeClick} className="like-button">
                    {likeCount} {isLike ? <MdThumbUp /> : <MdOutlineThumbUp />}
                  </div>

                  <div onClick={handleDislikeClick} className="dislike-button">
                    {dislikeCount}{" "}
                    {isDislike ? <MdThumbDown /> : <MdOutlineThumbDown />}
                  </div>
                </div>
                {/* add favorites */}
                {isFavorite(question.questionId) ? (
                  <MdFavorite
                    className="favourite-icon"
                    onClick={() => handleFavorite(question)}
                    style={{ color: "red" }}
                  />
                ) : (
                  <MdFavoriteBorder
                    className="favourite-icon"
                    onClick={() => handleFavorite(question)}
                  />
                )}

                <p className="author">Created by: {question.author}</p>
              </>
            )}
          </div>

          {/* display answers */}
          {submittedAnswer.length > 0 && (
            <>
              <h2 className="answer-title">Answers</h2>
              {submittedAnswer.map((answer, index) => (
                <div key={index} className="answer">
                  <p className="author"> {answer.username}</p>
                  <p dangerouslySetInnerHTML={{ __html: answer.comment }}></p>
                  <AiOutlineLike className="like-button" />
                  <AiOutlineDislike className="dislike-button" />
                </div>
              ))}
            </>
          )}

          {/* write an answer */}
          <div className="add-answer">
            <div className="write-title">Write an Answer</div>
            <form onSubmit={handleSubmit}>
              <div className="text-editor">
                <ReactQuill
                  theme="snow"
                  name="description"
                  className="quill-editor-my-custom-class"
                  onChange={handleDescriptionChange}
                />
                <div className="button">
                  <input type="submit" value="Post" className="post-button" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </SidePanelWithContainer>
    </BasicPage>
  );
}

export default Detailed;
