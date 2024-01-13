import './App.css';
import TopNavBar from './Components/TopNavBar/TopNavBar';
import SideNavBar from './Components/SideNavBar/SideNavBar';
import TopNavLink from './Components/TopNavBar/TopNavLink/TopNavLink';
import PageContainer from './Components/PageContainer/PageContainer';


export default function App() {
  return (
    <>
    <SideNavBar />
    <TopNavBar>
      <TopNavLink name="Home" url="/"/>
      <TopNavLink name="Watchlist" url="/watchlist"/>
      <TopNavLink name="Forum" url="/forum"/>
    </TopNavBar>
    <PageContainer>
      <h1>Home</h1>
    </PageContainer>
    </>
  )
}
