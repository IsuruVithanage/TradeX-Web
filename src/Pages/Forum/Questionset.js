import React from 'react'
import { Link } from 'react-router-dom'
import Records from "./Questionrecords.json";
import loadQuestions from "./Forum"

function Questionset(props) {
  console.log(props);
  return (
    <div>
        {
          props.questionlist && props.questionlist.map(record => {
              return(
                <div className='question-row'>
                <Link to="/Questionbar/Detailed">
                    <div className='question-title'>
                        { record.title}<br/><br/>
                  
                        <p>{record.description}</p>
                        <p style={{width:"600px" ,color:"#21DB9A"}}>{record.auther}</p>
                    
                    </div>
                </Link>

                  <div className='question-stat'>
                  <p>{record.views}</p>
                  </div>
                  <div className='question-stat'>
                  <p>{record.likes}</p>
                  </div>
                  <div className='question-stat'>
                  <p className='replies'>{record.replies}</p>
                  </div>
                  </div>
                
              )
        
          }) 
        }
     
     {/*   <Link to="/Questionbar/Detailed">
            <div className='question-title'>
                <h4>Understanding cryptocurrency wallet</h4>
          
                <p>Discuss best practices for securing cryptocurrency wallets, including the use of hardware wallets, two-factor authentication, and safe storage.</p>
                <p style={{width:"600px" ,color:"#21DB9A"}}>Spun Rathnayaka</p>
            
            </div>
        </Link>
      */}
 
    </div>
    
  )
}

export default Questionset


