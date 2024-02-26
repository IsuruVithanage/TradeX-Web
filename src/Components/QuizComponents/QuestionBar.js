import React, {useState} from 'react';
import './QuestionBar.css';
import {Input, Radio, Space} from 'antd';

export default function QuestionBar() {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const questionNumber = 1;

    return (
        <div className="question-container">
            <div className="question-desc">
                <span className="question-number">{questionNumber}.</span>
                <p>Certainly! You can use the :hover pseudo-class in CSS to change the border color when hovering over
                    the element. Here's how you can modify your CSS code</p>
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
                    <Radio value={1}>Option A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>Option C</Radio>
                    <Radio value={4}>Option C</Radio>
                </Space>
            </Radio.Group>
        </div>
    );
}
