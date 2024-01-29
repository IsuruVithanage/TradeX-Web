import React, { useState } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage'
import NewsBar from '../../Components/NewsBar/NewsItem'
import NewsBoard from '../../Components/NewsBar/NewsBoard'
import "./News.css"
 import { FaSearch } from "react-icons/fa";



export default function News() {
  return (
    <BasicPage>  
           <div className='search_bar'>
    	<FaSearch/>
      <input className='bar' type='text' placeholder='Search'></input>  
     </div>      
     <div className='news-container'>
        <NewsBoard />
       
        <NewsBar/>
        </div> 

    </BasicPage>
  )
}
