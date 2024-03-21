import React from 'react';
import './Signin.css';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { Link } from 'react-router-dom';

function Signin() {
   
  return (
    <BasicPage>
    <div>
    
            
    
      <div className='topic'>
        <h1 className='welcome'>WELCOME</h1>
        <h1 className='traders'>TRADERS</h1>
     </div>   
     <div className='black-background'>
        
        <input type="text" placeholder="User Name" className="username-input" />
        <input type="text" placeholder="Email" className="email-input"/>
        <input type="password" placeholder="Password" className="confirm-password-input" />

        <div >
            <button className='sign-button'>Sign in</button>
      </div>

      <div className="have-account">
          <div className='have-text'>Already have an account?</div> 
          <Link to="/Login&Signin/Login">
            <div className='login-link'>Login</div>   
          </Link> 
      </div>
        

      </div>
    </div>
</BasicPage>
  )
}

export default Signin
