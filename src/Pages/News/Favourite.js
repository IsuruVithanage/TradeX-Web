import React, { useState, useEffect } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage'
import NewsItem from '../../Components/NewsBar/NewsItem'
import "./News.css"
import Input from '../../Components/Input/Input'
import axios from 'axios'



export default function News() {
  const [articles,setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setIsLoading(true);
      axios
        .get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=bc6db274836c4c21aa4569104f316c17')
        .then(res => {
            setArticles(res.data.articles);
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
            return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url ={news.url}/>

          })}
        </div>
      </div> 

    </BasicPage>
  )
}
