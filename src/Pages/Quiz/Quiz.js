import React, { useEffect, useState } from 'react';
import BasicPage from "../../Components/BasicPage/BasicPage";
import QuestionBar from "../../Components/QuizComponents/QuestionBar";
import './Quiz.css';
import axios from "axios";
import QuizTimer from "../../Components/QuizComponents/QuizTImer";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {getUser} from "../../Storage/SecureLs";

export default function Quiz() {
    const user = getUser();

    const [questions, setQuestions] = useState([]);
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [startQuiz, setStartQuiz] = useState(false);
    let currentScore = 0;
    const navigate = useNavigate();

    const Tabs = [
        { label: "Quiz", path: "/quiz" },
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
                currentScore++;
            }
        });
        setScore(currentScore);
        allocateStartingFund(currentScore).then(r => {
            console.log("userID",user.id);
            updateUserState();

        });
    }

    const loadQuestions = async () => {
        try {
            const result = await axios.get(`http://localhost:8005/quiz/`);
            setQuestions(shuffleArray(result.data));
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    const allocateStartingFund = async (score) => {
        const ob = {
            userId: user.id,
            userName: user.userName,
            quantity: score >= 5 ? 100000 : 50000,
        };
        try {
            console.log("Sending allocation request with payload:", ob);
            const response = await fetch("http://localhost:8011/portfolio/asset/allocate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ob)
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error("Error response from server:", errorDetails);
                throw new Error(`Error allocating starting fund: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Allocation successful:", result);
        } catch (error) {
            console.error("Error allocating starting fund:", error);
        }
    };


    const updateUserState = async () => {
        try {
            await fetch(`http://localhost:8004/user/updateUserHasTakenQuiz/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                },
            });
        } catch (error) {
            console.error("Error allocating starting fund:", error);
        }
    }

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleQuizTimeout = () => {
        setIsSetterModalOpen(true);
        checkAnswers();
    }

    const getAnswers = (value) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[value.index] = value.answer;
            return newAnswers;
        });
    };

    const startTrade = () => {
        navigate('/watchlist');
    }

    const submitQuiz = () => {
        setIsSubmitModalOpen(true);
    }

    const startQuizTime = () => {
        setIsStartModalOpen(false);
        setStartQuiz(true);
    }

    return (
        <BasicPage tabs={Tabs}>
            <Modal open={isStartModalOpen} close={() => setIsStartModalOpen(false)}>
                <div className='quizmodel-container'>
                    <h1 style={{ marginBottom: 0 }}>Level Quiz</h1>
                    <p style={{ marginTop: 0 }}>This quiz checks the level of knowledge of your trading</p>
                    <div style={{ display: "flex" }}>
                        <Input type="button" value='Start' style={{ marginTop: '0.7rem', marginRight: '1rem' }} onClick={startQuizTime} />
                    </div>
                </div>
            </Modal>
            <div className='quiz-container'>
                <div className='quiz-top'>
                    <p>Level Quiz</p>
                    {startQuiz && <QuizTimer onTimeout={handleQuizTimeout} />}
                    <Input type="button" value='Submit' outlined style={{ marginTop: '0.7rem', marginRight: '1rem' }} onClick={submitQuiz} />
                </div>
                {questions.map((question, index) => (
                    <QuestionBar key={index} questionNumber={index} question={question} getAnswers={getAnswers} />
                ))}
            </div>
            <Modal open={isSubmitModalOpen} close={() => setIsSubmitModalOpen(false)}>
                <div className='quizmodel-container'>
                    <h1 style={{ marginBottom: 0 }}>Are you sure?</h1>
                    <p style={{ marginTop: 0 }}>Are you sure you want to submit the quiz?</p>
                    <div style={{ display: "flex" }}>
                        <Input type="button" value='Yes' style={{ marginTop: '0.7rem', marginRight: '1rem' }} onClick={handleQuizTimeout} />
                        <Input type="button" value='No' style={{ marginTop: '0.7rem', marginLeft: '1rem' }} red onClick={() => setIsSubmitModalOpen(false)} />
                    </div>
                </div>
            </Modal>
            <Modal open={isSetterModalOpen} close={() => handleQuizTimeout()} closable={false}>
                <div className='quizmodel-container'>
                    <div className='modelHead-container'>
                        <img src="https://i.postimg.cc/gcfCW5yn/tlogo2.png" alt="Logo" width={60} />
                        <h1 style={{ marginTop: '0' }}>Welcome</h1>
                    </div>
                    <p>You can now access our Trading Simulation Platform and practice trading in a risk-free environment</p>
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
                    <Input type="button" value='Get Start' style={{ marginTop: '0.7rem', marginBottom: '0.7rem' }} onClick={startTrade} />
                </div>
            </Modal>
        </BasicPage>
    )
}
