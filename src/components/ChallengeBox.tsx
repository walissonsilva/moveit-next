import { useContext } from 'react';
import styles from '../styles/components/ChallengeBox.module.css';

import { ChallengesContext } from '../contexts/ChallengesContext';

export function ChallengeBox() {
  const contextData = useContext(ChallengesContext);

  console.log(contextData);

  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      { hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>

          <main>
            <img src="icons/body.svg" alt=""/>

            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminhada de 3 minutos.</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}>
                Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}>
                Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber novos desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Complete-os e ganhe experiência e avance de leve.
          </p>
        </div>
      ) }
    </div>
  )
}