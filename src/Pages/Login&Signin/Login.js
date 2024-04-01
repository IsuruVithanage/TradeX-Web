import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import './Login.css';
import trade from '../../Assets/Images/trade.png';
import BasicPage from '../../Components/BasicPage/BasicPage';
import './LoginValidation';
import Validation from './LoginValidation';

function Login() {

  const [values,setValues]=useState({
    username:'',
    password:''
  })

  const [errors,setErrors]=useState({})
  const handleInput=(event)=>{
    setValues(prev =>({...prev,[event.target.name]:[event.target.value]}))
  } 

  const handleSubmit=(event)=>{
    event.preventDefault();
    setErrors(Validation(values));
  }
  return (
    <BasicPage sideNavBar={false} icon={<img src={trade} width="73px" alt='tradex'/>}>
    <div>
    
            
    
      <div className='topic'>
        <h1 className='welcome'>WELCOME</h1>
        <h1 className='traders'>TRADERS</h1>
     </div>   
     <div className='black-background'>
     <form action='' onSubmit={handleSubmit}>  
        <input type="password" placeholder="User Name" className="username-input"name='username' onChange={handleInput}/>
        {errors.username&& <span className='text-danger-uname'> {errors.username}</span>}
        <input type="password" placeholder="Password" className="password-input" name='password' onChange={handleInput}/>
        {errors.password&& <span className='text-danger-password'> {errors.password}</span>}

        <div className="forgot-password">
          <label htmlFor="forgot-password">Forgot Password ?</label>
        </div>

        <div>
          <Link to={'/home'}>
              <button type='submit' className='login-button'>Login</button>
          </Link>
        </div>
       </form> 
      </div>
    </div>
</BasicPage>
  )
}

export default Login
