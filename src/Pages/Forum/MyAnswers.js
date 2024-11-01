import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import { RiSoundModuleLine } from "react-icons/ri";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./forum.css";
import { useParams } from "react-router-dom";
import Answerset from "./Answerset";
import Input from "../../Components/Input/Input";

import axios from "axios";
import { getUser } from "../../Storage/SecureLs";
import { get } from "react-hook-form";

export default function MyAnswers() {
  let { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();

  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
  ];

  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const [answerlist, setAnswerList] = useState([]);

  const loadAnswers = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8010/answers/getAnswersByUserId/${user.id}`
      );

      const cleanedData = result.data.map((answer) => ({
        ...answer,
        comment: stripHtmlTags(answer.comment),
      }));

      console.log(cleanedData);
      setAnswerList(cleanedData);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  useEffect(() => {
    loadAnswers();
    fetchFavorites(1);
  }, [id]);

  console.log(answerlist);

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

  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
        style={{ height: "91vh", width: "21.2rem" }}
        header="Favourites"
        sidePanel={
          <div>
            {favorites.map((fav) => (
              <p
                key={fav.id}
                className="sub-title"
                onClick={() => navigate(`/forum/discussion/${fav.questionId}/${fav.likes}/${fav.dislike}`)}
              >
                {fav.title}
              </p>
            ))}
          </div>
        }
      >
        <div className="answer-component">
          <div className="topic-row">
            <div className="topic" style={{ marginLeft: "1.2rem" }}>
              <h4>Answers</h4>
            </div>
          </div>

          {answerlist.length > 0 ? (
            <Answerset answerlist={answerlist} />
          ) : (
            <div></div>
          )}
        </div>
      </SidePanelWithContainer>
    </BasicPage>
  );
}

