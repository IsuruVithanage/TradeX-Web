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

import Questionset from './Questionset';
import Input from "../../Components/Input/Input";
import axios from 'axios';
import { Shuffle } from '@mui/icons-material';


export default function Forum() {
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/Forum/MyProblems" },
    { label: "My Answers", path: "/Forum/MyAnswers" },
    { label: "Login", path: "/Login&Signin/Login" },
    { label: "Signup", path: "/Login&Signin/Signup" }

    
  ];

  const [questionlist,setQuestionList]=useState([]);

  const loadQuestions =async () => {
    try{
      const result=await axios.get("http://localhost:8010/forum/getAllQuestions");
      console.log(result.data);
        setQuestionList(result.data);
        
        }catch(error){
      console.error("Error fetching questions",error);
    }
    

  };

  useEffect(()=>{
    loadQuestions();
  },[])
  
  console.log(questionlist);

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

          <div style={{display: "flex", width: "100%" }}>
              <Input type="search" placeholder="Search" style={{width:"600px" ,marginLeft:"20px"}}/>
              <Link to="/forum/AskQuestion">
                <Input type="button" value="Ask Question"  style={{width:"130px" ,marginLeft:"15%"}}/>
              </Link>
              <RiSoundModuleLine className="filter-icon" style={{color:"#6D6D6D" ,marginLeft:"15%",size:"20px"}}></RiSoundModuleLine>
          </div>



    
      <div className='topic-row'>
              <div className='topic'>
                  <h4>Topic</h4>
              </div>
              <div className='topic-stat'>
                  <h4>Views</h4>
              </div>
              <div className='topic-stat-likes'>
                  <h4>Likes</h4>
              </div>
              <div className='topic-stat-replies'>
                  <h4>Replies</h4>
              </div>
          </div>

        {questionlist?( 
          <Questionset questionlist={questionlist} />
        ):(
          <div></div>
        )
          
      }
         
        

        
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
