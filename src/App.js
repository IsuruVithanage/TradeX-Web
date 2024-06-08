import './App.css';
import React, {useState} from 'react';
import BasicPage from './Components/BasicPage/BasicPage';
import trade from './Assets/Images/trade.png'
import Input from './Components/Input/Input';
import { Link } from 'react-router-dom';


export default function App() {
  const height = document.documentElement.clientHeight;
  const width = document.documentElement.clientWidth;
  const [nextPage, setNextPage] = useState("/watchlist")

  return (
    <BasicPage sideNavBar={false} icon={<img src={trade} width="73px" alt='tradex'/>}>
      <div style={{display:"flex", position:"absolute", bottom:"10px"}}>
        <p>Height : {height}</p>
        <p style={{marginLeft:"55px"}}>Width : {width}</p>
      </div>

      <div style={{marginLeft: "6%", marginTop: "6%"}}>
        <span style={{fontSize:"70px", color:"#ffffff", fontWeight:"800"}}>CRYPTO</span><span style={{fontSize:"70px", color:"#21DB9A", fontWeight:"800"}}>CURRENCY</span>
        <p style={{fontSize:"35px", color:"#21DB9A", fontWeight:"700"}}>SIMULATION  PLATFORM</p>
        <p style={{fontSize:"18px", color:"#ffffff", width:"838px"}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s         
        </p>

      <div style={{width:"300px", marginTop:"50px"}}>
        <Input type="dropdown" value={nextPage} label="Login As:" onChange={setNextPage}  options={[
            {value: "/watchlist", label: "User"},
            {value: "/admin/AdDashboard", label: "Admin"},
        ]}/>

        <Link to={nextPage} style={{width:"125px", height:"40px", display:"block"}}>
            <Input type="button" value="Get Started" style={{width:"125px", height:"40px", marginTop: "20px"}}/>
        </Link>
      </div>

        
      </div>
      
      
      
    </BasicPage>
  )
}
