import React, { Component } from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import Coin from '../../Components/coin/coin';

export default function Watchlist() {
  const Tabs = [
    { label:"Home", path:"/"},
    { label:"Watchlist", path:"/watchlist"},
    { label:"Alert", path:"/alert"},
  ];

  return (
    <BasicPage tabs={Tabs}>
        <h1>Watchlist</h1>
        <p>This is Watchlist page content</p>
    </BasicPage>
  )
}
