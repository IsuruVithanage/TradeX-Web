import React from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import Sidebar from '../../Components/Sidebar/sidebar'; 
import './forum.css';
import { FaSearch } from "react-icons/fa";

export default function Forum() {
  const Tabs = [
    { label: "Latest", path: "/" },
    { label: "Top", path: "/watchlist" },
    { label: "My Problems", path: "/alert" },
  ];

  return (
    <BasicPage tabs={Tabs}>
      <div className='search_bar'>
        <FaSearch></FaSearch><input className='bar' type='text' placeholder='Search'></input>
      </div>
      <Sidebar header="Top Categories">
        
      </Sidebar> 
      
    </BasicPage>
  );
}
