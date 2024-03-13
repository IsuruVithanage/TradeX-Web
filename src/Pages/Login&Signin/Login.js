import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import './Login.css';
import BasicPage from '../../Components/BasicPage/BasicPage';

function Login() {
   
  return (
    <BasicPage>
    <div>
    
            
    
      <div className='topic'>
        <h1 className='welcome'>WELCOME</h1>
        <h1 className='traders'>TRADERS</h1>
     </div>   
     <div className='black-background'>
        
        <input type="password" placeholder="User Name" className="username-input" />
        <input type="password" placeholder="Password" className="password-input" />

        <div className="forgot-password">
          <label htmlFor="forgot-password">Forgot Password ?</label>
        </div>

        <div>
         <button className='login-button'>Login</button>
        </div>
   
      </div>
    </div>
</BasicPage>
  )
}

export default Login
