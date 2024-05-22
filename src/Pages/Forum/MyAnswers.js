import React, { useEffect, useState } from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { RiSoundModuleLine } from "react-icons/ri";
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  
} from "react-router-dom";



import './forum.css';

import Answerset from './Answerset';
import Input from "../../Components/Input/Input";
import axios from 'axios';
import { Shuffle } from '@mui/icons-material';
import {useSelector} from "react-redux";


export default function MyAnswers() {
  const user = useSelector(state => state.user);
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },

    
  ];

  const [answerlist,setAnswerList]=useState([]);

  const loadAnswers =async () => {
    try{
      const result=await axios.get(`http://localhost:8010/forum/getAnswerssByUserId/${user.user.id}`);
      
      console.log(result.data);
        setAnswerList(result.data);
        
        }catch(error){
      console.error("Error fetching questions",error);
    }
    

  };

  useEffect(()=>{
    loadAnswers();
  },[])
  
  console.log(answerlist);

  return (
    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
          style={{height:"91vh"}}
          header = "Favourites"
          sidePanel ={
              <div >
                  <p className='sub-title'>Technical Analysis</p>
                  <p className='sub-title'>Understanding cryptocurrency</p>
                  <p className='sub-title'>Understanding cryptocurrency wallet</p>
               </div> 
          }>

         



    
      <div className='topic-row'>
              <div className='topic'>
                  <h4>Topic</h4>
              </div>
           
          </div>

        {answerlist?( 
          <Answerset answerlist={answerlist} />
        ):(
          <div></div>
        )
          
      }
         
        

        


         
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
// import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer'
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
