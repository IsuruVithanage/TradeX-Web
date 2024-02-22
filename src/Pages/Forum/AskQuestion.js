  import React from 'react' 
  import BasicPage from '../../Components/BasicPage/BasicPage';
  import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer'
  import './askQuestion.css';
  import { height } from '@mui/system';

  function AskQuestion() {


    const Tabs = [
      { label: "Latest", path: "/Forum" },
      { label: "My Problems", path: "/MyProblems" },
      { label: "My Answers", path: "/alert" },
      
    ];
    return (

    <BasicPage tabs={Tabs}>
      <SidePanelWithContainer
            style={{height:"91vh"}}
            header = "Favourites"
            sidePanel ={
                <div >
                    <p className='sub-title'>Technical Analysis</p>
                    <p className='sub-title'>Understanding cryptocurrency</p>
                    <p className='sub-title'>Understanding cryptocurrency wallet</p>
                    
                </div> 
            }>

              
    
      <div className="ask-Question">
        <div className="ask-ques-container">
          <h1>Ask a public Question</h1>
          <form>
            <div className="ask-form-container">
              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>Be specific and imagine you’re asking a question to another person.</p>
                <input type="text" id="ask-ques-title" placeholder="Ex: What are the most highest rated CryptoCurrencies?"/>
              </label>

              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                <textarea id="ask-ques-body" cols="30" rows="10"></textarea>
                

              </label>
              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add upto five tags to describe what your question is about. Start typing to see suggestions</p>
                <input type="text" id="ask-ques-tag"/>
              </label>
            </div>
            <input type="submit" value="Post" className="post-button"></input>
          </form>
        </div>
        
      </div>
    </SidePanelWithContainer>
  </BasicPage>
    )
  }

  export default AskQuestion
  