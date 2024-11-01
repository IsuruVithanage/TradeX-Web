import React, {useEffect, useState} from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import {useParams} from "react-router-dom";

import "./forum.css";

import Questionset from "./Questionset";
import Input from "../../Components/Input/Input";
import axios from "axios";
import {getUser} from "../../Storage/SecureLs";

export default function Forum() {
    let {id} = useParams();
    const navigate = useNavigate();
    const Tabs = [
        {label: "Latest", path: "/forum"},
        {label: "My Problems", path: "/forum/myProblems"},
        {label: "My Answers", path: "/forum/myAnswers"},
    ];

    const [questionlist, setQuestionList] = useState([]);

    const [search, setSearch] = useState("");
    const user = getUser();

    const loadQuestions = async () => {
        try {
            const result = await axios.get(
                "http://localhost:8010/forum/getAllQuestions"
            );
            console.log(result.data);
            setQuestionList(result.data);
        } catch (error) {
            console.error("Error fetching questions", error);
        }
    };

    useEffect(() => {
        loadQuestions();
        fetchFavorites(user.id);
    }, [id]);

    console.log(questionlist);

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

    const filteredQuestions = questionlist.filter((question) =>
        question.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <BasicPage tabs={Tabs}>
            <SidePanelWithContainer
                style={{height: "91vh"}}
                header="Favourites"
                sidePanel={
                    <div>
                        {favorites.map((fav) => (
                            <p
                                key={fav.id}
                                className="sub-title"
                                onClick={() => navigate(`/forum/discussion/${fav.questionId}`)}
                            >
                                {fav.title}
                            </p>
                        ))}
                    </div>
                }
            >
                <div style={{display: "flex", width: "100%"}}>
                    <Input
                        type="search"
                        placeholder="Search"
                        style={{width: "45rem", marginLeft: "20px", marginTop: "0.6rem"}}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link to="/forum/AskQuestion">
                        <Input
                            type="button"
                            value="Ask Question"
                            className="question_button"
                            style={{width: "130px", marginLeft: "15%", marginTop: "0.6rem"}}
                        />
                    </Link>
                </div>

                <div className="topic-row">
                    <div className="topic">
                        <h4>Topic</h4>
                    </div>
                    <div className="topic-stat">
                        <h4>Views</h4>
                    </div>
                    <div className="topic-stat-likes">
                        <h4>Likes</h4>
                    </div>
                    <div className="topic-stat-replies">
                        <h4>Replies</h4>
                    </div>
                </div>

                {filteredQuestions ? (
                    <Questionset questionlist={filteredQuestions}/>
                ) : (
                    <div></div>
                )}

                {/*  {
          Records && Records.map(record => {
            return(
              <div className='question-row' key={record.id}>
                 <div className='question-title'>
                  {record.title}<br/><br/>
                  </div> 

                  <h4>{record.description}</h4><br/><br/>
                  {record.auther}
              </div>
            )
          }) 
        }
       
      */}
            </SidePanelWithContainer>
        </BasicPage>
    );
}
