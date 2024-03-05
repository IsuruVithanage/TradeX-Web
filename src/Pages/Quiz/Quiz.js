import React, {useEffect, useState} from 'react'
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
import './Quiz.css';
import QuizTImer from "../../Components/QuizComponents/QuizTImer";
import axios from "axios";
import QuizTimer from "../../Components/QuizComponents/QuizTImer";
import Table, {TableRow} from "../../Components/Table/Table";
import Modal from "../../Components/Modal/Modal";

export default function Quiz() {
    const [questions,setQuestions]=useState([]);
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [answers,setAnswers] = useState([])


    const Tabs = [
        {label: "Quiz", path: "/quiz"},
    ];

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }


    const loadQuestions = async () => {
        try {
            const result = await axios.get(`http://localhost:8007/quiz/`, {
                headers: {
                    'access-token': localStorage.getItem("token")
                }
            });
            setQuestions(shuffleArray(result.data));
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }


    useEffect(() => {
        loadQuestions();
    }, []);

    const handleQuizTimeout = () => {
        setIsSetterModalOpen(true);
    }

    const getAnswers = (value) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers, value];
            console.log(newAnswers);
            return newAnswers;
        });
    };


    return (
        <BasicPage tabs={Tabs}>
            <div className='quiz-container'>
                <div className='quiz-top'>
                    <p>Level Quiz</p>
                    <QuizTimer onTimeout={handleQuizTimeout} />
                </div>
                {questions.map((question, index) => (
                    <QuestionBar key={index} questionNumber={index} question={question} getAnswers={getAnswers} />
                ))}
            </div>

            <Modal open={isSetterModalOpen} close={() => handleQuizTimeout()} closable={false}>
                <div style={{ width: '450px' }}>

                </div>
            </Modal>
        </BasicPage>
    )
}