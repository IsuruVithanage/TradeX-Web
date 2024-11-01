import "./Detailed.css";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { showMessage } from "../Message/Message";
import Input from "../../Components/Input/Input";
import {
  MdThumbUp,
  MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
} from "react-icons/md";
import { getUser } from "../../Storage/SecureLs";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response || error);
    return Promise.reject(error);
  }
);

function Detailed() {
  let { id } = useParams();
  const navigate = useNavigate();
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
  ];

  const user = getUser();
  const userId = user && user.id;
  const [question, setQuestion] = useState({});
  const [values, setValues] = useState({
    questionId: id,
    questionTitle: "",
    username: user.userName,
    userId: user.id,
    comment: "",
    likes: 0,
    dislikes: 0,
  });
  const [submittedAnswer, setSubmittedAnswer] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showAddAnswer, setShowAddAnswer] = useState(false);

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
        userId: user.id,
        isLike: likeStatus,
      })
      .then((res) => {
        setLikeCount(!isLike ? likeCount + 1 : likeCount - 1);
        setIsLike(likeStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDislikeClick = () => {
    if (isLike) {
      setIsLike(false);
      like(false);
    }
    dislike(!isDislike);
  };

  const dislike = async (dislikeStatus) => {
    axios
      .post("http://localhost:8010/forum/dislike", {
        questionId: id,
        userId: user.id,
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
        userId: user.id,
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
        questionTitle: "",
        username: user.userName,
        userId: user.id,
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

  const checkUserIsLiked = async () => {
    axios
      .post("http://localhost:8010/forum/userIsLiked", {
        questionId: id,
        userId: user.id,
      })
      .then((res) => {
        setIsLike(res.data.like);
        setIsDislike(res.data.dislike);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8083");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type) {
        console.log("data", data);
        if (data.type === "liked" && data.likeDetail.questionId === id) {
          setLikeCount(parseInt(data.likeDetail.likeCount.likeCount));
        } else if (
          data.type === "disLiked" &&
          data.disLikeDetail.questionId === id
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

  useEffect(() => {
    startWebSocket();
  }, []);

  const addUserView = async () => {
    axios
      .post("http://localhost:8010/forum/userIsViewd", {
        questionId: id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      setValues((prevOrder) => ({
        ...prevOrder,
        questionTitle: result.data[0].title,
      }));
      setLikeCount(result.data[0].likes);
      setDislikeCount(result.data[0].dislike);
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
      console.log("question:", response.data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  useEffect(() => {
    loadQuestions();
    fetchAnswers();
    fetchFavorites(1);
    checkUserIsLiked();
    addUserView();
  }, [id]);

  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
        style={{ height: "91vh", width: "22rem" }}
        header={
          <div className="header-container">
            <Input
              type="button"
              className="add-answer-btn"
              value={showAddAnswer ? "Hide Answer Form" : "Add Answer"}
              style={{
                width: "12rem",
                height: "2.6rem",
                fontWeight: "bold",
                marginLeft: "2rem",
              }}
              onClick={() => setShowAddAnswer(!showAddAnswer)}
            />
          </div>
        }
        sidePanel={
          <div>
            <div>
              <div
                className="favorite-header"
                style={{
                  fontSize: "20px",
                  marginTop: "3rem",
                  color: "#21DB9A",
                  fontWeight: 700,
                }}
              >
                Favourites
              </div>
              <br></br>

              {favorites.map((fav) => (
                <p
                  key={fav.id}
                  className="sub-title"
                  onClick={() =>
                    navigate(`/forum/discussion/${fav.questionId}`)
                  }
                >
                  {fav.title}
                </p>
              ))}
            </div>
          </div>
        }
      >
        <div>
          <h3 className="q-title">Question</h3>
          <div className="ques">
            {question && (
              <>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
                <div className="prefer-buttons">
                  <div onClick={handleLikeClick} className="like-button">
                    {likeCount} {isLike ? <MdThumbUp /> : <MdOutlineThumbUp />}
                  </div>
                  <div onClick={handleDislikeClick} className="dislike-button">
                    {dislikeCount === -1 ? 0 : dislikeCount}{" "}
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
                <p className="author">Created by: {question.userName}</p>
              </>
            )}
          </div>
          {submittedAnswer.length > 0 && (
            <>
              <h2 className="answer-title">Answers</h2>
              {submittedAnswer.map((answer, index) => (
                <div key={index} className="answer">
                  {/* <p className="author">{answer.userName}</p> */}
                  <p dangerouslySetInnerHTML={{ __html: answer.comment }}></p>
                  {/* <MdThumbUp className="like-button" />
                  <MdThumbDown className="dislike-button" /> */}
                  <p className="author">Created by: {answer.username}</p>
                </div>
              ))}
            </>
          )}
          {showAddAnswer && (
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
                      className="detailed-post-button"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </SidePanelWithContainer>
    </BasicPage>
  );
}

export default Detailed;
