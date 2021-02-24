import { useContext, useEffect, useState } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const totalCountdownTime = 0.05 * 60;

  const [time, setTime] = useState(totalCountdownTime);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const toggleActiveCountdown = () => {
    if (!isCountdownActive) {
      setHasFinished(false);
    }

    setIsCountdownActive(!isCountdownActive);
  }

  useEffect(() => {
    if (isCountdownActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (!isCountdownActive) {
      setTime(totalCountdownTime);
    } else if (isCountdownActive && time === 0) {
      setHasFinished(true);
      toggleActiveCountdown();
      startNewChallenge();
    }
  }, [isCountdownActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{ minuteLeft }</span>
          <span>{ minuteRight }</span>
        </div>
        <span>:</span>
        <div>
          <span>{ secondLeft }</span>
          <span>{ secondRight }</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}>
            Ciclo encerrado
        </button>
      ) : (
        <>
          {!isCountdownActive ? (
            <button
              type="button"
              onClick={toggleActiveCountdown}
              className={styles.countdownButton}>
                Iniciar o ciclo
            </button>
          ): (
            <button
              type="button"
              onClick={toggleActiveCountdown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                Abandonar ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}