import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../data/challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  expCurrent: number;
  expToNextLevel: number;
  completedChallenges: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  expCurrent: number;
  completedChallenges: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps) => {
  // state & vars
  const [level, setLevel] = useState(rest.level ?? 1);
  const [expCurrent, setExpCurrent] = useState(rest.expCurrent ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(
    rest.completedChallenges ?? 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  // functions
  function levelUp() {
    setLevel(level + 1);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} XP!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    let finalExp = expCurrent + activeChallenge.amount;

    if (finalExp >= expToNextLevel) {
      levelUp();
      setExpCurrent(finalExp - expToNextLevel);
    } else {
      setExpCurrent(finalExp);
    }

    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  // effects
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('expCurrent', String(expCurrent));
    Cookies.set('completedChallenges', String(completedChallenges));
  }, [level, expCurrent, completedChallenges]);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        expCurrent,
        expToNextLevel,
        completedChallenges,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeModal,
      }}>
      {children}
      {isModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};
