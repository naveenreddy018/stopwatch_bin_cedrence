import React, { useState, useEffect } from 'react';
import './clock.css';

const RoutineTimer = () => {
 let totalseconds = 60
  const [seconds, setSeconds] = useState(totalseconds);

  useEffect(() => {
    if (seconds >= 0) {
      const interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const formatTime = (sec) => {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins} : ${secs}`;
  };
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / totalseconds) * circumference;

  const circleStyle = (seconds <= 30) ? "empty" : "addcolor"

  return (
    <div className="timer-container">
      <h3>Routine starting in...</h3>
      <p className="subheading">Subheading here</p>

      <div className="circle-container">
        <svg className='svg1' viewBox="0 0 100 100">
          <circle className="circle-bg" cx="50" cy="50" r="45" />
          <circle
            className={`circle-progress ${seconds <= 30 ? "empty svg2": "addcolor"} ? "empty": "addcolor"`}
            cx="50"
            cy="50"
            r="45"
            stroke={circleStyle}
            strokeDasharray="282.6"
            strokeDashoffset={circumference + progress}
          />
        </svg>
        <div className="time">{formatTime(seconds)}</div>
      </div>

      <div className="btn-group">
        <button onClick={() => setSeconds(prev => prev - 10)}>-10 sec</button>
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
