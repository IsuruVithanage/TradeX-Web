import React from 'react'
import './Questionbar.css'


function Questionbar() {
  return (
    <div className='question-row'>
        <div className='side1'>
           
            <p className='number'>2 votes</p>
            <p className='number'>5 likes</p>
            
          
        </div>
        <div className='side2'>
            <h3>This is the first title</h3>
            <p>How should concrete types return an instance of an interface in a loosely-coupled way?</p>
        </div>
        <div className='side3'>
            <p>3 days ago</p>
        </div>
    </div>
  )
}

export default Questionbar
