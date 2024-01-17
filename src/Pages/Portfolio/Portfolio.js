import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';

export default function Portfolio() {
  
  const Tabs = [
    { label:"Home", path:"/"},
    { label:"Portfolio", path:"/portfolio"},
    { label:"History", path:"/portfolio/history"},
    ];

  return (
    <BasicPage tabs={Tabs}>
        <h1>Portfolio</h1>
        <p>This is Portfolio page content</p>
    </BasicPage>
  )
}
