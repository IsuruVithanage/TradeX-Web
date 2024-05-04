import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import './Login.css';
import trade from '../../Assets/Images/trade.png';
import BasicPage from '../../Components/BasicPage/BasicPage';
import './LoginValidation';
import Validation from './LoginValidation';



function Login() {
  const navigate = useNavigate();

  const [values,setValues]=useState({
    username:'',
    password:''
  })

  const [errors,setErrors]=useState({})
  const handleInput=(event)=>{
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  } 
 
  const handleSubmit=(event)=>{
    event.preventDefault();
    setErrors(Validation(values));
    if(Object.keys(Validation(values)).length === 0){
      navigate('/home');
    }
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
        <input type="text" placeholder="User Name" className="uname-input"name='username' onChange={handleInput}/>
        {errors.username && <span className='text-danger-uname'> {errors.username}</span>}
        <input type="password" placeholder="Password" className="password-input" name='password' onChange={handleInput}/>
        {errors.password && <span className='text-danger-password'> {errors.password}</span>}

        <div className="forgot-password"> 
          <label htmlFor="forgot-password">Forgot Password ?</label>
        </div>
        <button type='submit' className='login-button'>Login</button>
        {/* <div>
          <Link to={'/home'}>
              <button type='submit' className='login-button'>Login</button>
          </Link>
        </div> */}
       </form> 

       <div className="have-account">
          <div className='having-text'>Do not have an account?</div> 
          <Link to="/Signup">
            <div className='signup-link'>SignUp</div>   
          </Link> 
      </div>
      </div>
    </div>
</BasicPage>
  )
}

export default Login
