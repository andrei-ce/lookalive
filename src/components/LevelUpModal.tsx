import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export const LevelUpModal = () => {
  const { level, closeModal } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Congrats!</strong>
        <p>You have reached a new level</p>
        <button type='button' onClick={closeModal}>
          <img src='/icons/close.svg' alt='Close modal' />
        </button>
      </div>
    </div>
  );
};
