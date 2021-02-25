import { createContext, ReactNode, useState } from 'react';
import challenges from '../../data/challenges.json';

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
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

//this could be done in _app.tsx but ut here to clean things up
export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [level, setLevel] = useState(1);
  const [expCurrent, setExpCurrent] = useState(32);
  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
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
      }}>
      {children}
    </ChallengesContext.Provider>
  );
};
