// src/sections/GamesSection.js
import React from 'react';
import styles from './GamesSection.module.css'; // Correct way to import CSS Modules

const GamesSection = ({ sectionRef }) => {
  return (
    <section id="games" ref={sectionRef} className="content-section">
      <h2>Games</h2>
      <div className={styles['games-buttons']}> {/* Apply class using styles object */}
        <button className="rsvp-button-outline">Over/Under</button>
        <button className="rsvp-button-outline">Bingo</button>
      </div>
    </section>
  );
};

export default GamesSection;