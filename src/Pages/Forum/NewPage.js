import React from 'react'

export default function NewPage() {
  return (
    <div>
        <div className='container'>
            <div className='component1'>
                <div className='search_bar'>
                    <FaSearch/>
                    <input className='bar' type='text' placeholder='Search' ></input>
                    <button className ='ques-button'>Ask Question</button>
                    
                    <RiSoundModuleLine className="filter-icon"></RiSoundModuleLine>
                </div>

                {/* the table */}

                <div className='topic-row'>
                    <div className='topic'>
                        <h4>Topic</h4>
                    </div>
                    <div className='topic-stat'>
                        <h4>Views</h4>
                    </div>
                    <div className='topic-stat'>
                        <h4>Likes</h4>
                    </div>
                    <div className='topic-stat'>
                        <h4>Replies</h4>
                    </div>
                </div>


                <Questionset/>
                <Questionset/>
                <Questionset/>
                
            
                {/*<Detailed/>*/}
        
            </div>    
        </div>
    </div>
  )
}
