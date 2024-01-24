import './App.css';
import BasicPage from './Components/BasicPage/BasicPage';
import NewsBar from './Components/News/NewsBar';
import CoinBar from "./Components/SimulateChart/CoinBar";


export default function App() {
  const height = document.documentElement.clientHeight;
  const width = document.documentElement.clientWidth;

  const Tabs = [
    { label:"Home", path:"/"},
    { label:"Watchlist", path:"/watchlist"},
    { label:"Alert", path:"/alert"},
  ];

  return (
    <BasicPage tabs={Tabs}>

        <NewsBar/>

      <h1>Home</h1>
      <p>Height : {height}</p>
      <p>Width : {width}</p>
      <br/>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      
    </BasicPage>
  )
}
