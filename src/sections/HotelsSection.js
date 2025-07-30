// src/sections/HotelsSection.js
import React from 'react';
import styles from './HotelsSection.module.css'; // Correct way to import CSS Modules

const HotelsSection = ({ sectionRef }) => {
  return (
    <section id="hotels" ref={sectionRef} className="content-section">
      <h2>Hotel Recommendations</h2>
      <div className={styles['hotel-list']}> {/* Apply class using styles object */}
        <div className={styles['hotel-card']}> {/* Apply class using styles object */}
          <div className={styles['hotel-info']}> {/* Apply class using styles object */}
            <h3><a href="https://www.marriott.com/en-us/hotels/okcbw-renaissance-waterford-oklahoma-city-hotel/overview/" target="_blank" rel="noopener noreferrer">Renaissance Waterford OKC</a></h3>
            <p className={styles['hotel-address']}>6300 Waterford Blvd</p> {/* Apply class using styles object */}
            <div className={styles['hotel-details']}> {/* Apply class using styles object */}
                <span>~$140–150 / night</span>
                <span>~3.3 mi (≈7 min)</span>
            </div>
            <p className={styles['hotel-phone']}> (405) 848‑4782</p> {/* Apply class using styles object */}
          </div>
        </div>
         <div className={styles['hotel-card']}> {/* Apply class using styles object */}
          <div className={styles['hotel-info']}> {/* Apply class using styles object */}
            <h3><a href="https://www.hilton.com/en/hotels/okcqlhw-homewood-suites-oklahoma-city-quail-springs/" target="_blank" rel="noopener noreferrer">Homewood Suites Quail Springs</a></h3>
            <p className={styles['hotel-address']}>6000 W Memorial Rd</p> {/* Apply class using styles object */}
            <div className={styles['hotel-details']}> {/* Apply class using styles object */}
                <span>~$110–150 / night</span>
                <span>~5.9 mi (≈11 min)</span>
            </div>
            <p className={styles['hotel-phone']}> (405) 470‑0333</p> {/* Apply class using styles object */}
          </div>
        </div>
        <div className={styles['hotel-card']}> {/* Apply class using styles object */}
          <div className={styles['hotel-info']}> {/* Apply class using styles object */}
            <h3><a href="https://www.hilton.com/en/hotels/okcqugi-hilton-garden-inn-oklahoma-city-north-quail-springs/" target="_blank" rel="noopener noreferrer">Hilton Garden Inn North Quail Springs</a></h3>
            <p className={styles['hotel-address']}>3201 NW 137th St</p> {/* Apply class using styles object */}
            <div className={styles['hotel-details']}> {/* Apply class using styles object */}
                <span>~$90–130 / night</span>
                <span>~2.8 mi (≈8 min)</span>
            </div>
            <p className={styles['hotel-phone']}> (405) 752‑5200</p> {/* Apply class using styles object */}
          </div>
        </div>
         <div className={styles['hotel-card']}> {/* Apply class using styles object */}
          <div className={styles['hotel-info']}> {/* Apply class using styles object */}
            <h3><a href="https://www.hilton.com/en/hotels/okcones-embassy-suites-oklahoma-city-northwest/" target="_blank" rel="noopener noreferrer">Embassy Suites NW</a></h3>
            <p className={styles['hotel-address']}>3233 NW Expressway</p> {/* Apply class using styles object */}
            <div className={styles['hotel-details']}> {/* Apply class using styles object */}
                <span>~$150–185 / night</span>
                <span>~4.3 mi (≈9 min)</span>
            </div>
            <p className={styles['hotel-phone']}> (405) 842‑6633</p> {/* Apply class using styles object */}
          </div>
        </div>
         <div className={styles['hotel-card']}> {/* Apply class using styles object */}
          <div className={styles['hotel-info']}> {/* Apply class using styles object */}
            <h3><a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/oklahoma-city/okcpa/hoteldetail" target="_blank" rel="noopener noreferrer">Holiday Inn Express NW‑Quail Springs</a></h3>
            <p className={styles['hotel-address']}>3520 NW 135th St</p> {/* Apply class using styles object */}
            <div className={styles['hotel-details']}> {/* Apply class using styles object */}
                <span>~$110 (varies) / night</span>
                <span>~2.3 mi (≈6 min)</span>
            </div>
            <p className={styles['hotel-phone']}> 1‑877‑403‑0945</p> {/* Apply class using styles object */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;