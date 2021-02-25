import React, { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  // this was not moved to Context because it is not Business Logic,
  // it's only about layout
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Cycle Finished
        </button>
      ) : isActive ? (
        <button
          type='button'
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}>
          Abandon cycle
        </button>
      ) : (
        <button
          type='button'
          className={styles.countdownButton}
          onClick={startCountdown}>
          Start cycle
        </button>
      )}
    </div>
  );
};
