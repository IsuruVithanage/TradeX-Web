import React from 'react';
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
import { FaSearch } from "react-icons/fa";
import Detailed from '../../Components/Questionbar/Detailed';
import { color } from '@mui/system';
import Questionset from './Questionset';
import Input from "../../Components/Input/Input";
import AskQuestion from "../Forum/AskQuestion"


export default function Forum() {
  const Tabs = [
    { label: "Latest", path: "/" },
    { label: "My Problems", path: "/MyProblems" },
    { label: "My Answers", path: "/alert" },
    
  ];

  
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
              <Link to="/AskQuestion">
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
              <div className='topic-stat'>
                  <h4>Likes</h4>
              </div>
              <div className='topic-stat'>
                  <h4>Replies</h4>
              </div>
          </div>

          <Questionset/>
          <Questionset/>
          <Questionset/>
          <Questionset/>
          <Questionset/>


       
          

          <div>Ashan</div>
      </SidePanelWithContainer>
      
  
  </BasicPage>
  );
}
