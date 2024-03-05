import React from 'react';
import { useTimer } from 'react-timer-hook';
import './QuizTimer.css';

function MyTimer({ expiryTimestamp, onExpire }) {
    const { seconds, minutes, isRunning } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            console.warn('onExpire called');
            if (onExpire) {
                onExpire();
            }
        },
    });

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='timer-container'>
                <span style={{ fontSize: '1.5rem', color: '#9E9E9E', fontWeight: 'bold' }}>Duration : </span>
                <span>{formattedMinutes}</span>:<span>{formattedSeconds}</span>
            </div>
        </div>
    );
}

export default function QuizTimer({ onTimeout }) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10);
    return (
        <div>
            <MyTimer expiryTimestamp={time} onExpire={onTimeout} />
        </div>
    );
}
