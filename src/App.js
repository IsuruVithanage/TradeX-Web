import './App.css';
import BasicPage from './Components/BasicPage/BasicPage';
import CoinBar from "./Components/SimulateChart/CoinBar";


export default function App() {
  const Tabs = [
    { label:"Home", path:"/"},
    { label:"Watchlist", path:"/watchlist"},
    { label:"Alert", path:"/alert"},
  ];

  return (
    <BasicPage tabs={Tabs}>

        <CoinBar/>

      <h1>Home</h1>
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
      <p>This is Home page content</p>
      <p>This is Home page content</p>
      
    </BasicPage>
  )
}
