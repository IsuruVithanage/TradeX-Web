import React, { useState, useEffect } from 'react'
import BasicPage from '../../Components/Layouts/BasicPage/BasicPage'
import NewsItem from '../../Components/NewsBar/NewsItem'
import "./News.css"
import Input from '../../Components/Input/Input'
import axios from 'axios'
import {getUser} from '../../Storage/SecureLs';




export default function News() {

  const [articles,setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = getUser();
  const userId = user && user.id;

  useEffect(()=>{
    setIsLoading(true);
      axios
        .get('http://localhost:8008/news/fav/' + userId)
        .then(res => {
            console.log(res.data);
            setArticles(res.data);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        })
  },[])

  console.log(articles);

  return (
    <BasicPage 
        isLoading = {isLoading}
        tabs={ [
          {label:'Latest', path:'/news'},
          {label:'Favourite', path:'/news/favourite'}
        ] } 
    >  

      <div className='search_bar'>
            <Input type={"search"} placeholder={"serach"}/>
      </div>  

     <div className='news-container'>
        <div>
          {articles.map((news,index)=>{
            return <NewsItem key={index} userId={userId} {...news}/>

          })}
        </div>
      </div> 

    </BasicPage>
  )
}
