// src/sections/ScheduleSection.js
import React from 'react';
import './ScheduleSection.module.css'; // Import its specific CSS

const ScheduleSection = ({ sectionRef }) => {
  return (
    <section id="schedule" ref={sectionRef} className="content-section">
      <h2>Schedule</h2>
      <p><strong>Ceremony:</strong> 4:00 PM</p>
      <p><strong>Cocktails + Games:</strong> 5:00 PM</p>
      <p><strong>Group Pictures:</strong> 6:00 PM</p>
      <p><strong>Dinner:</strong> 6:30 PM</p>
      <p><strong>First Dance:</strong> 7:00 PM</p>
      <p><strong>Speeches + Toasts:</strong> 7:30 PM</p>
      <p><strong>Cake Cutting:</strong> 8:00 PM</p>
      <p><strong>Dancing:</strong> 8:15 PM</p>
      <p><strong>Sparkler Send Off:</strong> 11:00 PM</p>

      <p>Join us for an evening of celebration, dinner, and dancing following the ceremony.</p>
    </section>
  );
};

export default ScheduleSection;