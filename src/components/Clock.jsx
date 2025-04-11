import React, { useState, useEffect } from 'react';
import './clock.css';

const RoutineTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds >= 0) {
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const formatTime = (sec) => {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins} : ${secs}`;
  };

  const progress = (seconds / 60) * 100;

  return (
    <div className="timer-container">
      <h3>Routine starting in...</h3>
      <p className="subheading">Subheading here</p>

      <div className="circle-container">
        <svg viewBox="0 0 100 100">
          <circle className="circle-bg" cx="50" cy="50" r="45" />
          <circle
            className="circle-progress"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 - (282.6 * progress) / 100}
          />
        </svg>
        <div className="time">{formatTime(seconds)}</div>
      </div>

      <div className="btn-group">
        <button onClick={() => setSeconds(prev => prev + 10)}>+ 10 sec</button>
        <button onClick={() => setSeconds(0)}>Skip</button>
      </div>

      <div className="step-box">
        <p>Step 2/3</p>
        <div className="step-info">
          <div className="step-icon"></div>
          <div>
            <strong>Cleansing</strong>
            <p>⏱ 60 sec</p>
          </div>
         How to do 
        </div>
      </div>
    </div>
  );
};

export default RoutineTimer;
