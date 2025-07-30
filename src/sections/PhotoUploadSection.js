// src/sections/PhotoUploadSection.js
import React from 'react';
import './PhotoUploadSection.module.css';

const PhotoUploadSection = ({ sectionRef, onUploadButtonClick }) => { // Ensure onUploadButtonClick is destructured
  return (
    <section id="photo-upload" ref={sectionRef} className="content-section">
      <h2>Photo Upload</h2>
      <p>Scan the QR codes at your table or click below to upload your photos from our special day!</p>
      {/* Make sure the onClick handler is present and correct */}
      <button className="button" onClick={onUploadButtonClick}>Upload Photos</button>
    </section>
  );
};

export default PhotoUploadSection;