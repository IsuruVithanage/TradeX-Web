import React from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { RiSoundModuleLine } from "react-icons/ri";
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




export default function Forum() {
  const Tabs = [
    { label: "Latest", path: "/" },
    { label: "Top", path: "/watchlist" },
    { label: "My Problems", path: "/alert" },
  ];

  
  return (
    <BasicPage tabs={Tabs}>
  <div className='container'>
    <div className='component1'>
      <div className='search_bar'>
        <FaSearch/>
        <input className='bar' type='text' placeholder='Search' ></input>
        <button className ='ques-button'>Ask Question</button>
        
        <RiSoundModuleLine className="filter-icon"></RiSoundModuleLine>
      </div>

     {/* the table */}

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
    
  
    {/*<Detailed/>*/}
   
    </div> 

  
    <div className='component2'>
      <h3 className="fav-title">Favourites</h3>
      <p className='sub-title'>Technical Analysis</p>
      <p className='sub-title'>Understanding cryptocurrency</p>
      <p className='sub-title'>Understanding cryptocurrency wallet</p>

    </div>
      
    
    </div>
  </BasicPage>
  );
}
