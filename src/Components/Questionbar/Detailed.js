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
import { MdFavoriteBorder } from "react-icons/md";
import { Favorite } from "@mui/icons-material";
import Favourites from "../../Pages/Forum/Favorites";

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
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
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

  const handleDescriptionChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      comment: content,
    }));
  };

  //add favorites
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = async (question) => {
    try {
      // Update local state
      setFavorites((prevFavorites) => {
        if (prevFavorites.some((fav) => fav.id === question.questionId)) {
          return prevFavorites.filter((fav) => fav.id !== question.questionId);
        } else {
          return [...prevFavorites, question];
        }
      });

      // Send request to backend
      const response = await axios.post(
        "http://localhost:8010/forum/addFavorite",
        {
          questionId: question.questionId,
          userId: 1,
          title: question.title,
        }
      );

      // Log the response from the server
      console.log("Favorite added successfully:", response.data);
    } catch (error) {
      console.error("Error adding favorite:", error.response.data);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8010/answers/saveAnswer",
        values
      );
      console.log("Data added success");
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

  const addLike = async (qid, uid) => {
    try {
      const response = await axios.put(
        `http://localhost:8010/answers/addLike/${qid}/${uid}`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    loadQuestions();
    fetchAnswers();
    fetchFavorites(1);
  }, [id]);

  useEffect(() => {
    socket.on("add-like", (newPosts) => {
      setPostAddLike(newPosts);
      setPostRemoveLike([]);
    });
    socket.on("remove-like", (newPosts) => {
      setPostRemoveLike(newPosts);
      setPostAddLike([]);
    });
  }, []);

  let uiPosts =
    postAddLike.length > 0
      ? postAddLike
      : postRemoveLike.length > 0
      ? postRemoveLike
      : posts;

  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
        style={{ height: "91vh" }}
        header="Favourites"
        sidePanel={
          <div>
            {favorites.map((fav) => (
              <p key={fav.id} className="sub-title">
                {fav.title}
              </p>
            ))}
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
                <AiOutlineLike
                  className="like-button"
                  onClick={() => addLike(question.questionId, 1)}
                />
                <AiOutlineDislike className="dislike-button" />
                {question.likes}
                <MdFavoriteBorder
                  className="favourite-icon"
                  onClick={() => handleFavorite(question)}
                />
                <p className="author">Created by: {question.author}</p>
              </>
            )}
          </div>

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

          {submittedAnswer.length > 0 && (
            <>
              <h2 className="answer-title">Answers</h2>
              {submittedAnswer.map((answer, index) => (
                <div key={index} className="answer">
                  <p dangerouslySetInnerHTML={{ __html: answer.comment }}></p>
                  <AiOutlineLike className="like-button" />
                  <AiOutlineDislike className="dislike-button" />
                  <p className="author">Created by: {answer.username}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </SidePanelWithContainer>
    </BasicPage>
  );
}

export default Detailed;
