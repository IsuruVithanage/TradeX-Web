import React, {useEffect, useState} from 'react'
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
import './Quiz.css';
import QuizTImer from "../../Components/QuizComponents/QuizTImer";
import axios from "axios";
import QuizTimer from "../../Components/QuizComponents/QuizTImer";
import Table, {TableRow} from "../../Components/Table/Table";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Quiz() {
    const user = useSelector(state => state.user);
    const [questions, setQuestions] = useState([]);
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    let currentScore = 0;
    const navigate=useNavigate()


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

    function checkAnswers() {
        questions.forEach((question, index) => {
            const choosedAnswer = answers[index];

            if (question.correct_answer === choosedAnswer) {
                console.log(question.correct_answer + " == " + choosedAnswer);
                currentScore++;
            }
        });
        setScore(currentScore);
        allocateStatingFund(currentScore);

    }


    const loadQuestions = async () => {
        try {
            const result = await axios.get(`http://localhost:8005/quiz/`);
            setQuestions(shuffleArray(result.data));
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    const allocateStatingFund = async (score) => {
        const ob = {
            userId: user.user.id,
            coin: 'USD',
            quantity: score >= 5 ? 100000 : 50000,
            purchasePrice: 1,
            type: ''
        }
        try {
            const result = fetch("http://localhost:8011/portfolio/asset/transfer", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ob)
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
        checkAnswers();
        console.log(score);
    }

    const getAnswers = (value) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers, value];
            console.log(newAnswers);
            return newAnswers;
        });
    };

    const startTrade = () => {
        navigate('/watchlist');


    }

    return (
        <BasicPage tabs={Tabs}>
            <div className='quiz-container'>
                <div className='quiz-top'>
                    <p>Level Quiz</p>
                    <QuizTimer onTimeout={handleQuizTimeout}/>
                </div>
                {questions.map((question, index) => (
                    <QuestionBar key={index} questionNumber={index} question={question} getAnswers={getAnswers}/>
                ))}
            </div>

            <Modal open={isSetterModalOpen} close={() => handleQuizTimeout()} closable={false}>
                <div className='quizmodel-container'>
                    <div className='modelHead-container'>
                        <img
                            src="https://i.postimg.cc/gcfCW5yn/tlogo2.png"
                            alt="Logo"
                            width={60}
                        />
                        <h1 style={{marginTop: '0'}}>Welcome</h1>
                    </div>
                    <p>You can now access our Trading Simulation Platform and practice trading in a risk free
                        environment</p>

                    <div className='info-container'>
                        <p>Score</p>
                        <h1>{score}</h1>
                    </div>

                    <div className='info-container'>
                        <p>Level</p>
                        <h1>{score >= 5 ? 'Expert' : 'Beginner'}</h1>
                    </div>

                    <div className='info-container'>
                        <p>Starting Balance</p>
                        <h1>{score >= 5 ? '$ 100,000' : '$ 50,000'}</h1>
                    </div>

                    <Input type="button" value='Get Start' style={{marginTop: '0.7rem', marginBottom: '0.7rem'}}
                           onClick={startTrade}/>

                </div>
            </Modal>
        </BasicPage>
    )
}