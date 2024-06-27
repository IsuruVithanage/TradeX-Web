import "./Detailed.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import BasicPage from "../../Components/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/SidePanel/SidePanelWithContainer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
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

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response || error);
    return Promise.reject(error);
  }
);

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
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleDescriptionChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      comment: content,
    }));
  };

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

  const handleFavorite = async (question) => {
    try {
      const isFav = favorites.some(
        (fav) => fav.questionId === question.questionId
      );
      setFavorites((prevFavorites) => {
        if (isFav) {
          return prevFavorites.filter(
            (fav) => fav.questionId !== question.questionId
          );
        } else {
          return [...prevFavorites, question];
        }
      });

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const edit = searchParams.get("edit");
    const answerId = searchParams.get("answerId");
    if (edit === "true" && answerId) {
      fetchAnswerForEdit(answerId);
    } else {
      setValues({
        answerId: null,
        questionId: id,
        username: "",
        userId: 1,
        comment: "",
        likes: 0,
      });
      setIsEditing(false);
    }
  }, [id, location]);

  const fetchAnswerForEdit = async (answerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8010/answers/getAnswer/${answerId}`
      );
      setValues({
        ...response.data,
        answerId: response.data.answerId,
        questionId: id,
      });
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching answer for edit:", error);
      showMessage("error", "Failed to fetch answer for editing", 1.5);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isEditing) {
        if (!values.answerId) {
          throw new Error("No answer ID for editing");
        }
        response = await axios.put(
          `http://localhost:8010/answers/updateAnswer/${values.answerId}`,
          {
            ...values,
            questionId: id,
          }
        );
        showMessage("success", "Answer edited successfully", 1.5);
        setSubmittedAnswer((prevAnswers) =>
          prevAnswers.map((answer) =>
            answer.answerId === values.answerId ? response.data : answer
          )
        );
      } else {
        response = await axios.post(
          "http://localhost:8010/answers/saveAnswer",
          values
        );
        showMessage("success", "Answer posted", 1.5);
        setSubmittedAnswer((prevAnswers) => [...prevAnswers, response.data]);
      }

      setValues({
        answerId: null,
        questionId: id,
        username: "",
        userId: 1,
        comment: "",
        likes: 0,
      });
      setIsEditing(false);
      fetchAnswers();
    } catch (err) {
      console.error("Error submitting answer:", err);
      showMessage(
        "error",
        `Failed to ${isEditing ? "update" : "save"} answer: ${err.message}`,
        1.5
      );
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

  useEffect(() => {
    loadQuestions();
    fetchAnswers();
    fetchFavorites(1);
  }, [id]);

  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
        style={{ height: "91vh", width: "50vh" }}
        header={
          <div className="header-container">
            <button className="add-question-btn">Add Answer</button>
          </div>
        }
        sidePanel={
          <div>
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
          <div className="ques">
            {question && (
              <>
                <h3>{question.title}</h3>
                <br />
                <p>{question.description}</p>
                <div className="prefer-buttons">
                  <div onClick={handleLikeClick} className="like-button">
                    {likeCount} {isLike ? <MdThumbUp /> : <MdOutlineThumbUp />}
                  </div>
                  <div onClick={handleDislikeClick} className="dislike-button">
                    {dislikeCount}{" "}
                    {isDislike ? <MdThumbDown /> : <MdOutlineThumbDown />}
                  </div>
                </div>
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
          {submittedAnswer.length > 0 && (
            <>
              <h2 className="answer-title">Answers</h2>
              {submittedAnswer.map((answer, index) => (
                <div key={index} className="answer">
                  <p className="author">{answer.username}</p>
                  <p dangerouslySetInnerHTML={{ __html: answer.comment }}></p>
                  <AiOutlineLike className="like-button" />
                  <AiOutlineDislike className="dislike-button" />
                </div>
              ))}
            </>
          )}
          <div className="add-answer">
            <div className="write-title">
              {isEditing ? "Edit Answer" : "Write an Answer"}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="text-editor">
                <ReactQuill
                  theme="snow"
                  name="description"
                  className="quill-editor-my-custom-class"
                  onChange={handleDescriptionChange}
                  value={values.comment}
                />
                <div className="button">
                  <input
                    type="submit"
                    value={isEditing ? "Update" : "Post"}
                    className="post-button"
                  />
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
