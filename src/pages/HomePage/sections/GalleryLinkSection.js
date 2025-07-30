// src/sections/GalleryLinkSection.js
import React from 'react';
import './GalleryLinkSection.module.css'; // Import its specific CSS

const GalleryLinkSection = ({ onViewGallery }) => {
  return (
    <section id="gallery" className="content-section">
      <h2>Gallery</h2>
      <p>We'd love to see our wedding through your eyes! Click below to view and share photos from our special day.</p>
      <button className="rsvp-button-outline" onClick={onViewGallery}>View Photos</button>
    </section>
  );
};

export default GalleryLinkSection;