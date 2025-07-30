// src/sections/DirectionsSection.js
import React from 'react';
import './DirectionsSection.module.css'; // Import its specific CSS

const DirectionsSection = ({ sectionRef, mapUrl }) => {
  return (
    <section id="directions" ref={sectionRef} className="content-section">
      <h2>Directions to Coles Garden</h2>
      <p>1415 NE 63rd St, Oklahoma City, OK 73111</p>
      <div className="map-container">
        <iframe
          title="Map to Coles Garden"
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default DirectionsSection;