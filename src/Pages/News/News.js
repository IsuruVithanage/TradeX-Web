import React, { useState, useEffect } from 'react'; 
import BasicPage from '../../Components/Layouts/BasicPage/BasicPage'; 
import NewsItem from '../../Components/NewsBar/NewsItem'; 
import "./News.css"; 
import Input from '../../Components/Input/Input'; 
import axios from 'axios'; 

export default function News() {
  // State to store articles and loading status
  const [articles, setArticles] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const userId = 1;

  useEffect(() => {
    setIsLoading(true); 

    // Fetch news articles from the API
    axios.get('http://localhost:8008/news/' + userId)
      .then(res => {
        setArticles(res.data); 
        console.log(res.data)
        setIsLoading(false); 
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false); 
      });
  }, []); 


  //Check the title
  const filteredNews = articles.filter((news) =>
        news.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <BasicPage 
      isLoading={isLoading} // Pass loading status to BasicPage component
      tabs={[
        { label: 'Latest', path: '/news' },
        { label: 'Favourite', path: '/news/favourite' }
      ]}
    >  
      {/* Search input */}
      <div className='search_bar'>
        <Input type={"search"} placeholder={"search"} onChange={(e)=>setSearch(e.target.value)}/>
      </div>  

      {/* Container for news items */}
      <div className='news-container'>
        {/* Render news items */}
        {filteredNews.map((news, index) => (
          <NewsItem key={index} userId={userId} {...news}/>
        ))}
      </div> 
    </BasicPage> 
  );
}
