import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";
import "./askQuestion.css";
import Input from "../../Components/Input/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { showMessage } from "../../Components/Message/Message";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { getUser } from "../../Storage/SecureLs";

function AskQuestion() {
  const user = getUser();
  const navigate = useNavigate();
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
  ];

  const [values, setValues] = useState({
    userId: user.id,
    title: "",
    description: "",
    views: 0,
    likes: 0,
    replies: 0,
    dislike: 0,
    userName: user.userName,
  });

  const handleDescriptionChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      description: content,
    }));
  };

  const handleTitleChange = (content) => {
    setValues((prevOrder) => ({
      ...prevOrder,
      title: content,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const buttonType = event.nativeEvent.submitter.value;

    if (buttonType === "Cancel") {
      showMessage("error", "Question adding failed", 1.5);
      return;
    }

    // Strip HTML tags from description
    const strippedDescription = values.description.replace(/<[^>]*>?/gm, "");
    const updatedValues = { ...values, description: strippedDescription };
    console.log(updatedValues);
    axios
      .post("http://localhost:8010/forum", updatedValues)
      .then((res) => {
        console.log("Data added success");
        showMessage("success", "Question posted", 1.5);
        navigate("/forum");
      })
      .catch((err) => {
        console.log(err);
        showMessage("error", "Failed to post question", 1.5);
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

  useEffect(() => {
    console.log(user);
    fetchFavorites(1);
  }, []);

  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
        style={{ height: "91vh" }}
        header="Favourites"
        sidePanel={
          <div>
            <Link to="/forum/discussion">
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
            </Link>
          </div>
        }
      >
        <div className="ask-Question">
          <div className="ask-ques-container">
            <h2>Ask Your Question</h2>
            <form onSubmit={handleSubmit}>
              <div className="ask-form-container">
                <label className="ask-ques-title">
                  <h3>Title</h3>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Ex: What are the most highest rated CryptoCurrencies?"
                    name="title"
                    onChange={(e) => handleTitleChange(e.target.value)}
                    style={{ marginLeft: "3.5rem", width: "92%" }}
                  />
                </label>
                <div className="body">
                  <h3>Description</h3>
                  <div className="text-editor">
                    <ReactQuill
                      theme="snow"
                      name="description"
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
              </div>
              <div className="submit-buttons">
                <input
                  type="submit"
                  value="Post"
                  className="post-button"
                ></input>
                <input
                  type="submit"
                  value="Cancel"
                  className="cancel-button"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </SidePanelWithContainer>
    </BasicPage>
  );
}

export default AskQuestion;
