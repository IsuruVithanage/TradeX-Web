import React, {useEffect, useState} from 'react'
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
import './Quiz.css';
import QuizTImer from "../../Components/QuizComponents/QuizTImer";
import axios from "axios";

export default function Quiz() {
    const [questions,setQuestions]=useState([]);


    const Tabs = [
        {label: "Quiz", path: "/quiz"},
    ];

    const loadQuestions = async () => {
        try {
            const result = await axios.get(`http://localhost:8007/quiz/`, {
                headers: {
                    'access-token': localStorage.getItem("token")
                }
            });
            setQuestions(result.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }


    useEffect(() => {
        loadQuestions();
    }, []);

    return (
        <BasicPage tabs={Tabs}>
            <div className='quiz-container'>
                <div className='quiz-top'>
                    <p>Level Quiz</p>
                    <QuizTImer/>
                </div>
                {questions.map((question, index) => (
                    <QuestionBar key={index} questionNumber={index} question={question} />
                ))}
            </div>
        </BasicPage>
    )
}