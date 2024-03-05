import React, {useState} from 'react';
import './QuestionBar.css';
import {Input, Radio, Space} from 'antd';

export default function QuestionBar(props) {
    const [value, setValue] = useState(0);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        props.getAnswers(e.target.value)
    };

    return (
        <div className="question-container">
            <div className="question-desc">
                <span className="question-number">{props.questionNumber+1}.</span>
                <p>{props.question.question}</p>
            </div>
            {/*<div className="answer-container">
                <label>
                    <input
                        type="radio"
                        value="answer1"
                        checked={selectedAnswer === 'answer1'}
                        onChange={() => handleAnswerChange('answer1')}
                    />
                    Answer 1
                </label>
                <label>
                    <input
                        type="radio"
                        value="answer2"
                        checked={selectedAnswer === 'answer2'}
                        onChange={() => handleAnswerChange('answer2')}
                    />
                    Answer 2
                </label>
                <label>
                    <input
                        type="radio"
                        value="answer3"
                        checked={selectedAnswer === 'answer3'}
                        onChange={() => handleAnswerChange('answer3')}
                    />
                    Answer 3
                </label>
                <label>
                    <input
                        type="radio"
                        value="answer4"
                        checked={selectedAnswer === 'answer4'}
                        onChange={() => handleAnswerChange('answer4')}
                    />
                    Answer 4
                </label>
            </div>*/}
            <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                    <Radio value={1}>{props.question.answer1}</Radio>
                    <Radio value={2}>{props.question.answer2}</Radio>
                    <Radio value={3}>{props.question.answer3}</Radio>
                    <Radio value={4}>{props.question.answer4}</Radio>
                </Space>
            </Radio.Group>
        </div>
    );
}
