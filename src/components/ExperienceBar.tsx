import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/components/ExperienceBar.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

export const ExperienceBar = () => {
  // context
  const { exp, expToNextLevel } = useContext(ChallengesContext);

  // state
  const [expPercentage, setExpPercentage] = useState(0);

  // animations
  const variants = {
    bar: {
      left: { width: 0 },
      right: {
        width: String(expPercentage) + '%',
        transition: { duration: 1.5 },
      },
    },
    purple: {
      left: { x: '-100%', y: 0, opacity: 0.5 },
      right: {
        x: 0,
        y: ['+100%', '0%', '-300%', '0%', '+300%', '0%'],
        opacity: 1,
        transition: { ease: 'easeIn', duration: 1.25, delay: 0.1 },
      },
    },
    green: {
      left: { x: '-100%', y: 0, opacity: 0.3 },
      right: {
        x: 0,
        y: ['0%', '50%', '-350%', '0%', '+550%', '0%'],
        opacity: 1,
        transition: { ease: 'easeOut', duration: 1, delay: 0.1 },
      },
    },
    teal: {
      left: { x: '-100%', y: 0, opacity: 0.5 },
      right: {
        x: 0,
        y: ['+100%', '0%', '-420%', '0%', '+420%', '0%'],
        opacity: 1,
        transition: { ease: 'easeOut', duration: 1.25, delay: 0.1 },
      },
    },
  };

  useEffect(() => {
    setExpPercentage((exp / expToNextLevel) * 100);
  }, [expPercentage]);
  //
  return (
    <header className={styles.experienceBar}>
      <span>0 XP</span>
      <div>
        <motion.div variants={variants.bar} initial='left' animate='right'>
          <motion.div
            className={styles.experienceBar__poly}
            variants={variants.teal}
            initial='left'
            animate='right'>
            <img
              className={styles.experienceBar__poly__teal}
              src='teal.svg'
              alt='experience bar edge'
            />
          </motion.div>
          <motion.div
            className={styles.experienceBar__poly}
            variants={variants.purple}
            initial='left'
            animate='right'>
            <img
              className={styles.experienceBar__poly__purple}
              src='purple.svg'
              alt='experience bar edge'
            />
          </motion.div>

          <motion.div
            className={styles.experienceBar__poly}
            variants={variants.green}
            initial='left'
            animate='right'>
            <img
              className={styles.experienceBar__poly__green}
              src='green.svg'
              alt='experience bar edge'
            />
          </motion.div>
        </motion.div>
        <span
          className={styles.currentExperience}
          style={{ left: expPercentage + '%' }}>
          {exp} XP
        </span>
      </div>
      <span>{expToNextLevel} xp</span>
    </header>
  );
};
