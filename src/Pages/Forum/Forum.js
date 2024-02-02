import React from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { RiSoundModuleLine } from "react-icons/ri";


import './forum.css';
import { FaSearch } from "react-icons/fa";
import Questionbar from '../../Components/Questionbar/Questionbar';
import Detailed from '../../Components/Questionbar/Detailed';
import Datatable from './Datatable';


export default function Forum() {
  const Tabs = [
    { label: "Latest", path: "/" },
    { label: "Top", path: "/watchlist" },
    { label: "My Problems", path: "/alert" },
  ];

  
  return (
    <BasicPage tabs={Tabs}>
    <div className='component1'>
      <div className='search_bar'>
        <FaSearch/>
        <input className='bar' type='text' placeholder='Search'></input>
        <button className='ques-button'>Ask Question</button>
        <RiSoundModuleLine className="filter-icon"></RiSoundModuleLine>
      </div>

     {/* the table 

      <Datatable/>
  */}

    <Detailed/>
    </div> 

    
    <div className='component2'>
      <h3 className="fav-title">Favourites</h3>
      <p className='sub-title'>Technical Analysis</p>
      <p className='sub-title'>Understanding cryptocurrency</p>
      <p className='sub-title'>Understanding cryptocurrency wallet</p>

    </div>
      
      

    </BasicPage>
  );
}
