// src/sections/RegistrySection.js
import React from 'react';
import './RegistrySection.module.css'; // Import its specific CSS

const RegistrySection = ({ sectionRef }) => {
  return (
    <section id="registry" ref={sectionRef} className="content-section">
      <h2>Registry</h2>
      <p>Your presence is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at the following places:</p>
      <p><a href="https://www.amazon.com/wedding/share/thebowenswedding" target="_blank" rel="noopener noreferrer">Amazon Registry</a></p>
      <p><a href="https://www.target.com/gift-registry/wedding/thebowenswedding" target="_blank" rel="noopener noreferrer">Target Registry</a></p>
    </section>
  );
};

export default RegistrySection;