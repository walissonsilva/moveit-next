import React, { createContext, ReactNode, useState } from "react";

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  function startNewChallenge() {
    console.log('New challenge!');
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
    }}> 
      { children }
    </ChallengesContext.Provider>
  )
}