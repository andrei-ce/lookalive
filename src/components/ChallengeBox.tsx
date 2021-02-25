import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSuccess = () => {
    completeChallenge();
    resetCountdown();
  };
  const handleChallengeFail = () => {
    resetChallenge();
    resetCountdown();
  };

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Get {activeChallenge.amount} XP</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt='' />
            <strong>New Challenge</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type='button'
              onClick={handleChallengeFail}
              className={styles.challengeFailedButton}>
              I failed
            </button>
            <button
              type='button'
              onClick={handleChallengeSuccess}
              className={styles.challengeSucceededButton}>
              I finished
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a cycle to receive a new challenge</strong>
          <p>
            <img src='icons/level-up.svg' alt='level up' />
            Level up by completing challenges
          </p>
        </div>
      )}
    </div>
  );
};
