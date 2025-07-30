import React from 'react';
import { hotelsData } from '../../../data/hotelsData'; // Import data
import styles from './HotelsSection.module.css';

const HotelsSection = ({ sectionRef }) => {
  return (
    <section id="hotels" ref={sectionRef} className="content-section">
      <h2>Hotel Recommendations</h2>
      <div className={styles['hotel-list']}>
        {/* Map over the imported data array */}
        {hotelsData.map((hotel) => (
          <div key={hotel.name} className={styles['hotel-card']}>
            <div className={styles['hotel-info']}>
              <h3>
                <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                  {hotel.name}
                </a>
              </h3>
              <p className={styles['hotel-address']}>{hotel.address}</p>
              <div className={styles['hotel-details']}>
                <span>{hotel.price}</span>
                <span>{hotel.distance}</span>
              </div>
              <p className={styles['hotel-phone']}>{hotel.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelsSection;