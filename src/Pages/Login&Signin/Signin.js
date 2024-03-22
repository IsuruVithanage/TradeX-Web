import React, { useState } from 'react';
import './Signin.css';
import BasicPage from '../../Components/BasicPage/BasicPage';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signin() {
   const [values,setvalues]=useState({
    userName:'',
    email:'',
    password:''
   }) 
   const handleChange = (event) => {
    setvalues({...values, [event.target.name]: event.target.value});
}


   const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(values);
    axios.post('http://localhost:8004/user',values)
    .then(res=>console.log("Register success"))
    .catch(err=>console.log(err));
   }
  return (
    <BasicPage>
    <div>
    
            
    
      <div className='topic'>
        <h1 className='welcome'>WELCOME</h1>
        <h1 className='traders'>TRADERS</h1>
     </div>   
     <div className='black-background'>
      <form onSubmit={handleSubmit}> 
        <input type="text" placeholder="User Name" name='userName' className="username-input" onChange={handleChange} />
        <input type="text" placeholder="Email" name='email' className="email-input"  onChange={handleChange} />
        <input type="password" placeholder="Password" name='password' className="confirm-password-input"  onChange={handleChange}  />

        <div >
            <button className='sign-button'>Sign in</button>
      </div>

      </form> 

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
