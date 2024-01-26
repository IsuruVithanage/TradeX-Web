import React from 'react'
import { components } from 'react-select'
import BasicPage from '../../Components/BasicPage/BasicPage'
import NewsBar from '../../Components/NewsBar/NewsBar'
import "./News.css"


export default function News() {
  return (
    <BasicPage>         
        <div className='news-container'>
        <NewsBar/>
        <NewsBar/>
        <NewsBar/>
        <NewsBar/>
        <NewsBar/>
        <NewsBar/>
        </div>

    </BasicPage>
  )
}
