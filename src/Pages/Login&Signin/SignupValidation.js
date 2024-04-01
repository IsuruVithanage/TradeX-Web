import React from 'react'

function Validation(values){
    let error={}
    const username_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/

    if(values.username ===""){
        error.username="Username should not be empty"
    }
    else if(!username_pattern.test(values.username)){
        error.username="Username didn't match"
    }else{
        error.username=""
    }
    

    if(values.email ===""){
        error.email="Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Email didn't match"
    }else{
        error.email=""
    }



    if(values.password === ""){
        error.password="Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password="Password didn't match"
    }else{
        error.password=""
    }
    return error;
}
export default Validation;