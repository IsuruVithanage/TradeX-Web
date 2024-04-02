import React, { useState } from 'react';
import './Signup.css';
import BasicPage from '../../Components/BasicPage/BasicPage';
import trade from '../../Assets/Images/trade.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Validation from './SignupValidation';

function Signup() {
   const [values,setvalues]=useState({
    userName:'',
    email:'',
    password:''

   }) 

   
   const [errors,setErrors]=useState({})
 


   const handleChange = (event) => {
    setvalues({
      ...values,
      [event.target.name]: event.target.value
    });
}


   const handleSubmit=(event)=>{
    event.preventDefault();
    setErrors(Validation(values));
    console.log(values);
    axios.post('http://localhost:8004/user/saveUser',values)
    .then(res=>console.log("Register success"))
    .catch(err=>console.log(err));
   }
  return (
    
    // Sign in box of the page
    <BasicPage sideNavBar={false} icon={<img src={trade} width="73px" alt='tradex'/>}>
    <div>
      <div className='topic'>
        <h1 className='welcome'>WELCOME</h1>
        <h1 className='traders'>TRADERS</h1>
        
     </div>  
  
     <div className='black-background'>
      <form onSubmit={handleSubmit}> 
        <input type="text" placeholder="User Name" name='userName' className="username-input" onChange={handleChange} />
        {errors.username&& <span className='text-danger-uname'> {errors.username}</span>}

        <input type="text" placeholder="Email" name='email' className="email-input"  onChange={handleChange} />
        {errors.email&& <span className='text-danger-email'> {errors.email}</span>}

        <input type="password" placeholder="Password" name='password' className="confirm-password-input"  onChange={handleChange}/>
        {errors.password&& <span className='text-danger-password'> {errors.password}</span>}

        <div >
            <button className='sign-button'>Sign Up</button>
      </div>

      </form> 

      <div className="have-account">
          <div className='have-text'>Already have an account?</div> 
          <Link to="/">
            <div className='login-link'>Login</div>   
          </Link> 
      </div>
        

      </div>
    </div>
</BasicPage>
  )
}

export default Signup
