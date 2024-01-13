import React from 'react'
import SideNavBar from '../../Components/SideNavBar/SideNavBar'
import TopNavBar from '../../Components/TopNavBar/TopNavBar'
import TopNavLink from '../../Components/TopNavBar/TopNavLink/TopNavLink'
import PageContainer from '../../Components/PageContainer/PageContainer'

export default function Watchlist() {
  return (
    <div>
      <SideNavBar />
      <TopNavBar>
        <TopNavLink name="Home" url="/"/>
        <TopNavLink name="Watchlist" url="/watchlist"/>
      </TopNavBar>
      <PageContainer/>
    </div>
  )
}
