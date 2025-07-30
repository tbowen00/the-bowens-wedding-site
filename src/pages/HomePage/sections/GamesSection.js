// src/sections/GamesSection.js
import React from 'react';
import styles from './GamesSection.module.css'; // Import its specific CSS

// Accept new props for click handlers
const GamesSection = ({ sectionRef, onOverUnderClick, onBingoClick }) => {
  return (
    <section id="games" ref={sectionRef} className="content-section">
      <h2>Games</h2>
      <div className={styles['games-buttons']}>
        {/* Attach click handlers */}
        <button className="rsvp-button-outline" onClick={onOverUnderClick}>Over/Under</button>
        <button className="rsvp-button-outline" onClick={onBingoClick}>Bingo</button>
      </div>
    </section>
  );
};

export default GamesSection;