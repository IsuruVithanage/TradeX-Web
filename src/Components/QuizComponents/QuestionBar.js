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
