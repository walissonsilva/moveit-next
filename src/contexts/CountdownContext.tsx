import { createContext, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isCountdownActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const totalCountdownTime = 0.05 * 60;

  const [time, setTime] = useState(totalCountdownTime);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = () => {
    setIsCountdownActive(true);
  }
  
  const resetCountdown = () => {
    setIsCountdownActive(false);
    clearTimeout(countdownTimeout);
    setTime(totalCountdownTime);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isCountdownActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isCountdownActive && time === 0) {
      setHasFinished(true);
      startNewChallenge();
    }
  }, [isCountdownActive, time]);

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isCountdownActive,
      startCountdown,
      resetCountdown,
    }}>
      { children }
    </CountdownContext.Provider>
  )
}