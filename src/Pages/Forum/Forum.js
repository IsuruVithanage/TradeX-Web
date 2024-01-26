import React from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { RiSoundModuleLine } from "react-icons/ri";


import './forum.css';
import { FaSearch } from "react-icons/fa";
import Questionbar from '../../Components/Questionbar/Questionbar';


export default function Forum() {
  const Tabs = [
    { label: "Latest", path: "/" },
    { label: "Top", path: "/watchlist" },
    { label: "My Problems", path: "/alert" },
  ];

  
  return (
    <BasicPage tabs={Tabs}>
      <div className='search_bar'>
    	<FaSearch/>
      <input className='bar' type='text' placeholder='Search'></input>
      <button className='ques-button'>Ask Question</button>
      <RiSoundModuleLine className="filter-icon"></RiSoundModuleLine>
      </div>

      <Questionbar>
      
          
       
        </Questionbar>
      <Questionbar/>
      <Questionbar/>
  
      

      
     
      
    </BasicPage>
  );
}
