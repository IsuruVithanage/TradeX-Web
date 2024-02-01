import { useEffect } from "react";
import { useState } from "react"
import NewsItem from "./NewsItem";

 const NewsBoard = () => {

     const [articles,setArticles] = useState([]);
     useEffect(()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bc6db274836c4c21aa4569104f316c17`;
      fetch(url).then(response=> response.json()).then(data=> setArticles(data.articles));

     },[])

     console.log(articles);

  return (      
    <div>
      {articles.map((news,index)=>{
        return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url ={news.url}/>

      })}
    </div>
  )
}
export default NewsBoard
