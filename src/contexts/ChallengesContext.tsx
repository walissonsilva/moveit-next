import React, { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';

import challenges from '../data/challenges.json';

interface IChallengeData {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallengeData;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = () => {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio! 🎉', {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  } 

  const resetChallenge = () => {
    setActiveChallenge(null);
  }

  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    } else {
      const { amount } = activeChallenge;

      let finalExperience = currentExperience + amount;

      if (finalExperience >= experienceToNextLevel) {
        levelUp();

        finalExperience = finalExperience - experienceToNextLevel;
        setCurrentExperience(finalExperience);
        
        setChallengesCompleted(challengesCompleted + 1);
      } else {
        setCurrentExperience(currentExperience + activeChallenge.amount);
      }

      setActiveChallenge(null);
    }
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      experienceToNextLevel,
      challengesCompleted,
      activeChallenge,
      startNewChallenge,
      levelUp,
      resetChallenge,
      completeChallenge,
    }}> 
      { children }
    </ChallengesContext.Provider>
  )
}