import React, { useState } from "react";
import BasicPage from '../../Components/BasicPage/BasicPage';

import Questionset from './Questionset';
import Input from "../../Components/Input/Input";
import './forum.css';

import { RiSoundModuleLine } from "react-icons/ri";
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer'



 function MyAnswers() {

  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
    
  ];
  
    const [selectedPage, setSelectedPage] = useState("Activated");
    const [alertRepeat, setAlertRepeat] = useState(undefined);
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

        <Questionset/>
        <Questionset/>
        <Questionset/>
        <Questionset/>
        <Questionset/>


     
      

       
    </SidePanelWithContainer>
    

</BasicPage>
    
  )
}

export default MyAnswers
