import React, { useState } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage'
import NewsBar from '../../Components/NewsBar/NewsItem'
import NewsBoard from '../../Components/NewsBar/NewsBoard'
import "./News.css"
import Input from '../../Components/Input/Input'


export default function jhx() {
  return (
    <BasicPage 
    tabs={ [
      {label:'Latest', path:'/news'},
      {label:'Favourite', path:'/news/favourite'}
    ] }
    >  
           <div className='search_bar'>
           <Input type={"search"} placeholder={"serach"}/>

     </div>      
     <div className='news-container'>
        <NewsBoard />
        <NewsBar/>
        </div> 

    </BasicPage>
  )
}
