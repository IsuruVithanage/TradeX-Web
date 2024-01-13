import './App.css';
import BasicPage from './Components/BasicPage/BasicPage';
import TopNavTab from './Components/TopNavTab/TopNavTab';


export default function App() {
  const Tabs = [
    <TopNavTab label="Home" url="/"/>,
    <TopNavTab label="Watchlist" url="/watchlist"/>,
    <TopNavTab label="news" url="/news"/>,
  ];

  return (
    <BasicPage TopNavTabs={Tabs}>
        <h1>Home</h1>
        <p>This is Home page content</p>
    </BasicPage>
  )
}
