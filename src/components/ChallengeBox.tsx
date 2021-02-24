import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

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
              onClick={resetChallenge}
              className={styles.challengeFailedButton}>
              Failed
            </button>
            <button type='button' className={styles.challengeSucceededButton}>
              Finished
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
