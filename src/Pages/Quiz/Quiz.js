import React, {useState} from 'react'
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
import './Quiz.css';
import QuizTImer from "../../Components/QuizComponents/QuizTImer";

export default function Quiz() {
    const Tabs = [
        {label: "Quiz", path: "/quiz"},
    ];

    return (
        <BasicPage tabs={Tabs}>
            <div className='quiz-container'>
                <div className='quiz-top'>
                    <p>Level Quiz</p>
                    <QuizTImer/>
                </div>
                <QuestionBar/>
                <QuestionBar/>
                <QuestionBar/>
                <QuestionBar/>
                <QuestionBar/>
            </div>
        </BasicPage>
    )
}