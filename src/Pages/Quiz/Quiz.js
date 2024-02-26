import React, {useState} from 'react'
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
import './Quiz.css';

export default function Quiz() {
    const Tabs = [
        {label: "Quiz", path: "/quiz"},
    ];

    return (
        <BasicPage tabs={Tabs}>
            <div className='quiz-container'>
                <QuestionBar/>
                <QuestionBar/>
                <QuestionBar/>
                <QuestionBar/>
                <QuestionBar/>
            </div>
        </BasicPage>
    )
}