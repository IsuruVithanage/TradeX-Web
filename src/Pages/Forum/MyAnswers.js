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
                onClick={() => navigate(`/forum/discussion/${fav.questionId}`)}
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

// import React, { useEffect,useState } from "react";
// import BasicPage from '../../Components/BasicPage/BasicPage';
// import Detailed from "../../Components/Questionbar/Detailed";
// import axios from "axios";
// import Input from "../../Components/Input/Input";
// import './forum.css';
// import { RiSoundModuleLine } from "react-icons/ri";
// import SidePanelWithContainer from '../../Components/Layouts/SidePanel/SidePanelWithContainer'
// import { Link } from 'react-router-dom'

//  function MyAnswers() {

//   const Tabs = [
//     { label: "Latest", path: "/forum" },
//     { label: "My Problems", path: "/forum/myProblems" },
//     { label: "My Answers", path: "/forum/myAnswers" },

//   ];

//      const [answerlist, setAnswerlist]=useState([]);

//     // const loadAnswers =async () => {
//     //     try{
//     //       const result=await axios.get(`http://localhost:8010/forum/saveAnswer`);
//     //       console.log(result.data);
//     //         setAnswerlist(result.data);

//     //         }catch(error){
//     //       console.error("Error fetching questions",error);
//     //     }

//     //   };

//     //   useEffect(()=>{
//     //     loadAnswers();
//     //   },[])

//     //   console.log(answerlist);

//     const loadAnswers = async () => {
//         try {
//           const result = await axios.get(`http://localhost:8010/forum/saveAnswer`);
//           setAnswerlist(result.data);
//         } catch (error) {
//           console.error("Error fetching answers", error);
//         }
//       };

//       const postAnswer = async (newAnswer) => {
//         try {
//           // Assuming your backend API endpoint for posting answers is "/forum/postAnswer"
//           const response = await axios.post(
//             "http://localhost:8010/forum/postAnswer",
//             newAnswer
//           );
//           // Assuming the backend returns the newly posted answer with its ID
//           const postedAnswer = response.data;
//           // Update the answerlist state with the new answer
//           setAnswerlist([...answerlist, postedAnswer]);
//         } catch (error) {
//           console.error("Error posting answer", error);
//         }
//       };

//   return (
//     <BasicPage tabs={Tabs}>

//     <Answerset answerlist={answerlist} />

//     <SidePanelWithContainer
//         style={{height:"91vh"}}
//         header = "Favourites"
//         sidePanel ={
//             <div >
//                 <p className='sub-title'>Technical Analysis</p>
//                 <p className='sub-title'>Understanding cryptocurrency</p>
//                 <p className='sub-title'>Understanding cryptocurrency wallet</p>

//             </div>
//         }>

//     </SidePanelWithContainer>

// </BasicPage>

//   )

//   function Answerset(props) {
//     console.log(props);
//     return (
//       <div>
//      <div>
//       {props.answerlist.map((answer) => (
//         <div key={answer.answerId}>
//           <p>{answer.content}</p>
//           {/* Render other answer details as needed */}
//         </div>
//       ))}
//     </div>
// </div>

//     )
//   }

// }

// export default MyAnswers
