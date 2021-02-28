import { useContext } from 'react';
import styles from '../styles/components/ChallengeBox.module.css';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

export function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
    completeChallenge,
  } = useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSuccedded = () => {
    completeChallenge();
    resetCountdown();
  }
  
  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe { activeChallenge.amount } xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>

            <strong>Novo desafio</strong>
            <p>{ activeChallenge.description }</p>
          </main>

          <footer>
            <button
              type="button"
              onClick={ handleChallengeFailed }
              className={styles.challengeFailedButton}>
                Falhei
            </button>
            <button
              type="button"
              onClick={ handleChallengeSuccedded }
              className={styles.challengeSucceededButton}>
                Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo e receba desafios ao serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Ganhe experiência e qualidade de vida ao completar os desafios.
          </p>
        </div>
      ) }
    </div>
  )
}