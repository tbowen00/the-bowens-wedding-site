// src/sections/SpotifySection.js
import React from 'react';
import styles from './SpotifySection.module.css'; // Make sure this import is correct

const SpotifySection = ({ sectionRef, embedUrl, shareUrl }) => {
  return (
    <section id="spotify" ref={sectionRef} className="content-section">
      <h2>Our Playlist</h2>
      <p>Help us build the soundtrack for our wedding night! Add your favorite songs to our collaborative playlist.</p>
      <div className={styles['spotify-container']}> {/* Apply class using styles object */}
        <iframe
            title="Spotify Playlist"
            style={{borderRadius: '12px', border: 'none'}}
            src={embedUrl}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
      </div>
      <div style={{textAlign: 'center', marginTop: '1rem'}}>
          <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="rsvp-button-outline">
              Open Spotify
          </a>
      </div>
    </section>
  );
};

export default SpotifySection;