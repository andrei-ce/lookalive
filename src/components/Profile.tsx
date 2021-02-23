import React from 'react';
import styles from '../styles/components/Profile.module.css';

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/andrei-ce.png' alt='Developer' />
      <div>
        <strong>Andrei Ce</strong>
        <p>
          <img src='icons/level.svg' alt='level' />
          Level 1
        </p>
      </div>
    </div>
  );
};
