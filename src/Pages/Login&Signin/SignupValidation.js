import React from 'react'

function Validation(values){
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/

    if(values.username ===""){
        error.username="Username should not be empty"
    }else{
        error.username=""
    }
    

    if(values.email ===""){
        error.email="Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Enter a correct email address"
    }else{
        error.email=""
    }



    if(values.password === ""){
        error.password="Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password="Password must include Uppercase, Lowercase & numbers"
    }else{
        error.password=""
    }
    return error;
}
export default Validation;