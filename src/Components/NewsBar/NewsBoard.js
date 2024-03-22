import { useState, useEffect } from "react"
import NewsItem from "./NewsItem";
import axios from 'axios';

 const NewsBoard = () => {

  const [articles,setArticles] = useState([]);

  useEffect(()=>{
    axios
      .get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=bc6db274836c4c21aa4569104f316c17')
      .then(res => {
          setArticles(res.data.articles);
      })
      .catch(error => {
          console.log(error);
      })
  },[])

    articles.map(article => {
      console.log(article.url);
    })

    //console.log(articles);

  return (      
    <div>
      {articles.map((news,index)=>{
        return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url ={news.url}/>

      })}
    </div>
  )
}
export default NewsBoard
