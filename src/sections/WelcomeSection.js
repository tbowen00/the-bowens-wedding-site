// src/sections/WelcomeSection.js
import React from 'react';
import styles from './WelcomeSection.module.css';

const WelcomeSection = ({ onRsvpClick, onScrollToDetails }) => {
  return (
    <section className={styles['welcome-section']}>
        <div className={styles['welcome-heading']}>
            {/* REMOVED: Monogram Element */}
            <h1>The Bowen's</h1>
            <p className={styles['welcome-date']}>July 17, 2027</p>
            <p className={styles['welcome-venue']}>Coles Garden</p>
            <p className={styles['welcome-address']}>1415 NE 63rd St, Oklahoma City, OK 73111</p>
        </div>
        <button className="rsvp-button-outline" onClick={onRsvpClick}>RSVP</button>
        <div className={styles['scroll-indicator']} onClick={onScrollToDetails}>↓</div>
    </section>
  );
};

export default WelcomeSection;