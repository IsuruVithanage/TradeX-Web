import React from 'react'
import { Link } from 'react-router-dom'

function Questionset() {
  return (
    <div>
      
      <div className='question-row'>
        <Link to="/Questionbar/Detailed">
            <div className='question-title'>
                <h4>Understanding cryptocurrency wallet</h4>
          
                <p>Discuss best practices for securing cryptocurrency wallets, including the use of hardware wallets, two-factor authentication, and safe storage.</p>
                <p style={{width:"600px" ,color:"#21DB9A"}}>Spun Rathnayaka</p>
            
            </div>
        </Link>
        <div className='question-stat'>
            <p>9</p>
        </div>
        <div className='question-stat'>
            <p>2</p>
        </div>
        <div className='question-stat'>
            <p className='replies'>5</p>
        </div>
    </div>
    </div>
  )
}

export default Questionset
