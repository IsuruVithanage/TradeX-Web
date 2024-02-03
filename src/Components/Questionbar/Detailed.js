import React from 'react'
import './Detailed.css' 
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

function Detailed() {
 
  
  return (
    <div>
      <div className='ques'>
        <h3>Understanding Cryptocurrency Wallet Security</h3>
        <h5>Question Explain</h5>
        <p>Explore the functionalities that set hardware wallets apart in terms of security. Dive into topics such as the device's ability to store private keys offline, isolate cryptographic processes, and generate keys securely. Encourage users to discuss real-world scenarios where these features prove crucial in safeguarding digital assets.</p>
        
        <AiOutlineLike className='like-button'/>
        <AiOutlineDislike className='dislike-button' />
      
        <p className='author'>Created by: </p>
      </div>

      <h2>3 Answers</h2>
      <div className='answer'>
        <h3>Two-factor authentication</h3>
        <h5>Question Explain</h5>
        <p>Two-factor authentication adds an additional layer of security by requiring users to verify their identity through a second authentication method, such as a mobile app or SMS code. This helps prevent unauthorized access, even if the password is compromised.</p>
        
        <AiOutlineLike className='like-button'/>
        <AiOutlineDislike className='dislike-button' />
      
        <p className='author'>Created by: </p>
      </div>
    </div>
  )
}


export default Detailed
