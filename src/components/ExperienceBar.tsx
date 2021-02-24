import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/components/ExperienceBar.module.css';

export const ExperienceBar = () => {
  // state
  const [currentXP, setCurrentXP] = useState(0);
  const [max, setMax] = useState(360);
  const [min, setMin] = useState(0);

  // animations
  const barVariants = {
    left: { width: 0 },
    right: {
      width: String(currentXP) + '%',
      transition: { duration: 1.5 },
    },
  };

  const polygonVariant_purple = {
    left: { x: '-100%', y: 0, opacity: 0.5 },
    right: {
      x: 0,
      y: ['+100%', '0%', '-300%', '0%', '+300%', '0%'],
      opacity: 1,
      transition: { ease: 'easeIn', duration: 1.25, delay: 0.1 },
    },
  };

  const polygonVariant_green = {
    left: { x: '-100%', y: 0, opacity: 0.3 },
    right: {
      x: 0,
      y: ['0%', '50%', '-350%', '0%', '+550%', '0%'],
      opacity: 1,
      transition: { ease: 'easeOut', duration: 1, delay: 0.1 },
    },
  };

  const polygonVariant_teal = {
    left: { x: '-100%', y: 0, opacity: 0.5 },
    right: {
      x: 0,
      y: ['+100%', '0%', '-420%', '0%', '+420%', '0%'],
      opacity: 1,
      transition: { ease: 'easeOut', duration: 1.25, delay: 0.1 },
    },
  };

  useEffect(() => {
    setCurrentXP(40);
  }, [currentXP]);
  //
  return (
    <header className={styles.experienceBar}>
      <span>{min} xp</span>
      <div>
        <motion.div variants={barVariants} initial='left' animate='right'>
          <motion.div
            className={styles.experienceBar__poly}
            variants={polygonVariant_teal}
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
            variants={polygonVariant_purple}
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
            variants={polygonVariant_green}
            initial='left'
            animate='right'>
            <img
              className={styles.experienceBar__poly__green}
              src='green.svg'
              alt='experience bar edge'
            />
          </motion.div>
        </motion.div>
        <span className={styles.currentExperience} style={{ left: currentXP + '%' }}>
          {max} xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
};
