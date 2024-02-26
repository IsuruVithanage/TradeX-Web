import React, {useState} from 'react'
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
export default function Quiz() {
    const Tabs = [
        {label: "Quiz", path: "/quiz"},
    ];

    return(
        <BasicPage tabs={Tabs}>
            <QuestionBar/>


        </BasicPage>
    )
}