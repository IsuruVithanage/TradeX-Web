import React from 'react'
import BasicPage from '../../Components/BasicPage/BasicPage';
import TopNavTab from '../../Components/TopNavTab/TopNavTab';

export default function Watchlist() {
  const Tabs = [
    <TopNavTab label="Home" url="/"/>,
    <TopNavTab label="Watchlist" url="/watchlist"/>,
    <TopNavTab label="news" url="/news"/>,
  ];

  return (
    <BasicPage TopNavTabs={Tabs}>
        <h1>Watchlist</h1>
        <p>This is Watchlist page content</p>
    </BasicPage>
  )
}
