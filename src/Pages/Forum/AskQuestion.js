  import React, { useState } from 'react' 
  import BasicPage from '../../Components/BasicPage/BasicPage';
  import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer'
  import './askQuestion.css';
  import { height } from '@mui/system';
  import Input from "../../Components/Input/Input";
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  import axios from 'axios';
  
  function AskQuestion() {


    const Tabs = [
      { label: "Latest", path: "/Forum" },
      { label: "My Problems", path: "/MyProblems" },
      { label: "My Answers", path: "/forum/MyAnswers" },
      
    ];

    {/*const [value,setValue] =  useState("");
    
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  */}
   
      const [values,setvalues]=useState({
       questionId:null,
       userId:1,
       title:'',
       description:'',
       views:0,
       likes:0,
       replies:0
      }) 
      const handleDescriptionChange = (content) => {
        setvalues({...values, description: content});
    };
    
   
   const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(values);
    axios.post('http://localhost:8010/forum',values)
    .then(res=>console.log("Data added success"))
    .catch(err=>console.log(err));
   }

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
          <h2>Ask Your Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="ask-form-container">
              <label className="ask-ques-title">
                <h3>Title</h3>
               {/* <p>Be specific and imagine you’re asking a question to another person.</p>*/}
                <Input type="text" id="title" placeholder="Ex: What are the most highest rated CryptoCurrencies?" name='title' onChange={handleDescriptionChange}/>
              </label>

              <div className="body">
                <h3>Description</h3>
                {/*<p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>*/}
                {/*<textarea id="ask-ques-body" className='text-area' cols="30" rows="15" placeholder=''>
 
                </textarea>*/}
                  <div className="text-editor">
                    <ReactQuill theme="snow"  name='description' onChange={handleDescriptionChange} />
                  </div>

              </div>
          {/*   <label className="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add upto five tags to describe what your question is about. Start typing to see suggestions</p>
                <input type="text" id="ask-ques-tag"/>
              </label>
          */}
            </div>
            <div className='submit-buttons'>
              <input type="submit" value="Post" className="post-button"></input>
              <input type="submit" value="Cancel" className="cancel-button"></input>
            </div>
          </form>
        </div>
        
      </div>
    </SidePanelWithContainer>
  </BasicPage>
    )
  }

  export default AskQuestion
  