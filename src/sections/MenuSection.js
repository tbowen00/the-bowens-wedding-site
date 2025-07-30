// src/sections/MenuSection.js
import React from 'react';
import './MenuSection.module.css'; // Import its specific CSS

const MenuSection = ({ sectionRef }) => {
  return (
    <section id="menu" ref={sectionRef} className="content-section">
      <h2>Menu</h2>
      <p><strong>Appetizer:</strong> Bruschetta with Balsamic Glaze</p>
      <p><strong>Entree:</strong> Herb-Crusted Chicken Breast with Garlic Mashed Potatoes</p>
      <p><strong>Sides:</strong> Seasonal Roasted Vegetables & Artisan Rolls</p>
    </section>
  );
};

export default MenuSection;