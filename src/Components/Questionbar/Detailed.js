

import './Detailed.css' 
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import BasicPage from '../../Components/BasicPage/BasicPage';
import SidePanelWithContainer from '../../Components/SidePanel/SidePanelWithContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  
} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from '../Input/Input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Detailed() {
  let { id } = useParams();
  const Tabs = [
    { label: "Latest", path: "/forum" },
    { label: "My Problems", path: "/forum/myProblems" },
    { label: "My Answers", path: "/forum/myAnswers" },
    
  ];
  const [question,setQuestion]=useState({});

  const [values,setValues]=useState({
    answerId:null,
    questionId:1,
    username:'',
    userId:1,
    comment:'',
    likes:0,
  });

  const [submittedAnswer, setSubmittedAnswer] = useState([]);



  const handleDescriptionChange= (content) => {
    setValues(prevOrder => ({
      ...prevOrder,
      comment: content
  }));
};
  
  const handleSubmit =(event) => {
    event.preventDefault();

    
    
    console.log(values);
    console.log("name");
    axios.post('http://localhost:8010/answers/saveAnswer', values)

    .then((res) => {
      console.log('Data added success');
      // Update submittedAnswer state to display the submitted answer below
      setSubmittedAnswer(values);
    })
    .catch((err) => console.log(err));
    };


  useEffect(() => {
    loadQuestions();
    console.log(question);
  }, []);

  

  const loadQuestions =async () => {
    try{
      const result=await axios.get(`http://localhost:8010/forum/getQuestionsByQuestionId/${id}`);
      console.log(result.data[0].title);
        setQuestion(result.data);
        
        }catch(error){
      console.error("Error fetching questions",error);
    }
  };
    
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`http://localhost:8010/forum/getQuestionsByQuestionId/${id}`); // Replace 'http://localhost:8010/answers/${id}' with your actual backend endpoint to fetch answers by question id
        setSubmittedAnswer(response.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    useEffect(() => {
      fetchAnswers();
    }, []);

  

  
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
    <div>
      <div className='ques'>
      {question.length > 0 && (
      <>
        <h3>{question[0].title}</h3>
        <br/>
        <p>{question[0].description}</p> 
        <AiOutlineLike className='like-button'/>
        <AiOutlineDislike className='dislike-button'/>
        <p className='author'>Created by: {question[0].author}</p> 
      </>
  )}
      
      </div>

      {/* add an answer field */}
      <div className='add-answer'>
        <div className="write-title">Write an Answer</div>
        <form onSubmit={handleSubmit}>
          <div className="text-editor">
            <ReactQuill theme="snow" name='description' className="quill-editor-my-custom-class" onChange={handleDescriptionChange}/>
            <div className="button" >
             <input type="submit" value="Post" className="post-button"></input>
            </div>
            
          </div>
        </form>
        
      </div>


      {/* show answers for the post */}
      {submittedAnswer && <>
              <h2 className="answer-title">Answers</h2>
              <div className="answer">
                
                <p>{submittedAnswer.comment}</p>

                <AiOutlineLike className='like-button'/>
                <AiOutlineDislike className='dislike-button' />
        
      
                <p className='author'>Created by: </p>
              </div>
              
      </>}
        

     
      </div>
    
    </SidePanelWithContainer>
   </BasicPage>
    )
  
}


export default Detailed
