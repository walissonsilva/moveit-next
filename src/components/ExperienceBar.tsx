import React, { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
  const {
    currentExperience,
    experienceToNextLevel,
  } = useContext(ChallengesContext);

  const percentExperience = Math.round(currentExperience / experienceToNextLevel * 100);
  console.log(percentExperience);

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