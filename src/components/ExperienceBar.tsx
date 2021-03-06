import React, { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
  const {
    currentExperience,
    experienceToNextLevel,
  } = useContext(ChallengesContext);

  const percentExperience = !isNaN(currentExperience) && !isNaN(experienceToNextLevel)
    ? Math.round(currentExperience / experienceToNextLevel * 100)
    : 0;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentExperience}%` }}></div>
        <span className={styles.currentExperience} style={{ left: `${percentExperience}%` }}>
          { currentExperience } xp
        </span>
      </div>
      <span>{ experienceToNextLevel } xp</span>
    </header>
  )
}

export default ExperienceBar;