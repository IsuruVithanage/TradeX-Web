import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';

export default function Forum() {
  const Tabs = [
    { label:"Home", path:"/"},
    { label:"Watchlist", path:"/watchlist"},
    { label:"Alert", path:"/alert"},
  ];

  return (
    <BasicPage tabs={Tabs}>
        <h1>Forum</h1>
        <p>This is Forum page content</p>
    </BasicPage>
  )
}
