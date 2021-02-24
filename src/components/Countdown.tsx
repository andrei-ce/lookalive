import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
  // state
  const [time, setTime] = useState(21 * 60);
  const [isPaused, setIsPaused] = useState(true);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountdown = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    console.log('isPaused? ' + isPaused);
    if (!isPaused && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [isPaused, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <button
        type='button'
        className={styles.countdownButton}
        onClick={startCountdown}>
        {isPaused ? 'Start cycle' : 'Pause cycle'}
      </button>
    </div>
  );
};
