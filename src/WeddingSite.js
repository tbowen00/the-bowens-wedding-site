// WeddingSite.js
import React, { useState, useRef } from 'react';
import ImageSlideshow from './components/imageslideshow';
import Navigation from './components/Navigation';
import RsvpModal from './components/RsvpModal';
import Modal from './components/Modal';
import GalleryPage from './components/GalleryPage';

export default function WeddingSite() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'gallery'
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const mainContentRef = useRef(null);
  const sectionRefs = {
    schedule: useRef(null), menu: useRef(null), hotels: useRef(null),
    // Removed 'photos' from here as it now directly triggers GalleryPage or leads to a Gallery link
    games: useRef(null), spotify: useRef(null),
    registry: useRef(null), directions: useRef(null),
  };

  const handleNavigate = (id) => {
    setIsNavOpen(false); // Close nav on navigation

    // If the link is for the gallery, switch the page view
    if (id === 'gallery' || id === 'photos') { // 'photos' also leads to gallery for simplicity
      setCurrentPage('gallery');
      return;
    }
    
    // If we are not on the home page, switch back before scrolling
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Use a timeout to allow the DOM to update before scrolling
      setTimeout(() => {
        if (sectionRefs[id] && sectionRefs[id].current) {
          sectionRefs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    } else {
      // Otherwise, just scroll
      if (sectionRefs[id] && sectionRefs[id].current) {
          sectionRefs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  const handleViewDetails = () => {
    if (sectionRefs.schedule && sectionRefs.schedule.current) {
        sectionRefs.schedule.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (currentPage === 'gallery') {
    return <GalleryPage onBack={() => setCurrentPage('home')} />; // Go back to home from gallery
  }

  return (
    <>
      <RsvpModal 
        isOpen={isRsvpModalOpen} 
        onClose={() => setIsRsvpModalOpen(false)}
        onSubmit={(message) => setModalMessage(message)} // Updated to receive and set message
      />
      <Modal message={modalMessage} onClose={() => setModalMessage('')} />
      <div className="app-container">
        <Navigation onNavigate={handleNavigate} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <ImageSlideshow />
        <main className="content-column" ref={mainContentRef}>
          <div className="content-wrapper">
            
            <section className="welcome-section">
                <div className="welcome-heading">
                    <h1>The Bowens</h1>
                    <p>July 17, 2027 — Coles Garden, Oklahoma City</p>
                </div>
                <button className="rsvp-button-outline" onClick={() => setIsRsvpModalOpen(true)}>RSVP</button>
                <div className="scroll-indicator" onClick={handleViewDetails}>↓</div>
            </section>

            <section id="schedule" ref={sectionRefs.schedule} className="content-section">
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

            <section id="menu" ref={sectionRefs.menu} className="content-section">
              <h2>Menu</h2>
              <p><strong>Appetizer:</strong> Bruschetta with Balsamic Glaze</p>
              <p><strong>Entree:</strong> Herb-Crusted Chicken Breast with Garlic Mashed Potatoes</p>
              <p><strong>Sides:</strong> Seasonal Roasted Vegetables & Artisan Rolls</p>
            </section>

            {/* Renamed to photo-upload to avoid ID conflict/confusion with gallery */}
            <section id="photo-upload" className="content-section">
              <h2>Photo Upload</h2>
              <p>Scan the QR codes at your table or click below to upload your photos from our special day!</p>
              <button className="button">Upload Photos</button>
            </section>

            <section id="gallery" className="content-section"> {/* Removed ref={sectionRefs.photos} here */}
              <h2>Gallery</h2>
              <p>We'd love to see our wedding through your eyes! Click below to view and share photos from our special day.</p>
              <button className="rsvp-button-outline" onClick={() => setCurrentPage('gallery')}>View Photos</button>
            </section>

            <section id="hotels" ref={sectionRefs.hotels} className="content-section">
              <h2>Hotel Recommendations</h2>
              <div className="hotel-list">
                <div className="hotel-card">
                  <div className="hotel-info">
                    <h3><a href="https://www.marriott.com/en-us/hotels/okcbw-renaissance-waterford-oklahoma-city-hotel/overview/" target="_blank" rel="noopener noreferrer">Renaissance Waterford OKC</a></h3>
                    <p className="hotel-address">6300 Waterford Blvd</p>
                    <div className="hotel-details">
                        <span>~$140–150 / night</span>
                        <span>~3.3 mi (≈7 min)</span>
                    </div>
                    <p className="hotel-phone">(405) 848‑4782</p>
                  </div>
                </div>
                 <div className="hotel-card">
                  <div className="hotel-info">
                    <h3><a href="https://www.hilton.com/en/hotels/okcqlhw-homewood-suites-oklahoma-city-quail-springs/" target="_blank" rel="noopener noreferrer">Homewood Suites Quail Springs</a></h3>
                    <p className="hotel-address">6000 W Memorial Rd</p>
                    <div className="hotel-details">
                        <span>~$110–150 / night</span>
                        <span>~5.9 mi (≈11 min)</span>
                    </div>
                    <p className="hotel-phone">(405) 470‑0333</p>
                  </div>
                </div>
                <div className="hotel-card">
                  <div className="hotel-info">
                    <h3><a href="https://www.hilton.com/en/hotels/okcqugi-hilton-garden-inn-oklahoma-city-north-quail-springs/" target="_blank" rel="noopener noreferrer">Hilton Garden Inn North Quail Springs</a></h3>
                    <p className="hotel-address">3201 NW 137th St</p>
                    <div className="hotel-details">
                        <span>~$90–130 / night</span>
                        <span>~2.8 mi (≈8 min)</span>
                    </div>
                    <p className="hotel-phone">(405) 752‑5200</p>
                  </div>
                </div>
                 <div className="hotel-card">
                  <div className="hotel-info">
                    <h3><a href="https://www.hilton.com/en/hotels/okcones-embassy-suites-oklahoma-city-northwest/" target="_blank" rel="noopener noreferrer">Embassy Suites NW</a></h3>
                    <p className="hotel-address">3233 NW Expressway</p>
                    <div className="hotel-details">
                        <span>~$150–185 / night</span>
                        <span>~4.3 mi (≈9 min)</span>
                    </div>
                    <p className="hotel-phone">(405) 842‑6633</p>
                  </div>
                </div>
                 <div className="hotel-card">
                  <div className="hotel-info">
                    <h3><a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/oklahoma-city/okcpa/hoteldetail" target="_blank" rel="noopener noreferrer">Holiday Inn Express NW‑Quail Springs</a></h3>
                    <p className="hotel-address">3520 NW 135th St</p>
                    <div className="hotel-details">
                        <span>~$110 (varies) / night</span>
                        <span>~2.3 mi (≈6 min)</span>
                    </div>
                    <p className="hotel-phone">1‑877‑403‑0945</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="games" ref={sectionRefs.games} className="content-section">
              <h2>Games</h2>
              <div className="games-buttons">
                <button className="rsvp-button-outline">Over/Under</button>
                <button className="rsvp-button-outline">Bingo</button>
              </div>
            </section>

            <section id="spotify" ref={sectionRefs.spotify} className="content-section">
              <h2>Our Playlist</h2>
              <p>Help us build the soundtrack for our wedding night! Add your favorite songs to our collaborative playlist.</p>
              <div className="spotify-container">
                <iframe
                    title="Spotify Playlist"
                    style={{borderRadius: '12px', border: 'none'}}
                    src="https://open.spotify.com/embed/playlist/1IW9C77E5NwUXJs6o4QplP?utm_source=generator&theme=0" // Updated to a real Spotify embed URL
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
              </div>
            </section>

            <section id="registry" ref={sectionRefs.registry} className="content-section">
              <h2>Registry</h2>
              <p>Your presence is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at the following places:</p>
              <p><a href="https://www.amazon.com/wedding/share/thebowenswedding" target="_blank" rel="noopener noreferrer">Amazon Registry</a></p> {/* Example link */}
              <p><a href="https://www.target.com/gift-registry/wedding/thebowenswedding" target="_blank" rel="noopener noreferrer">Target Registry</a></p> {/* Example link */}
            </section>

            <section id="directions" ref={sectionRefs.directions} className="content-section">
              <h2>Directions to Coles Garden</h2>
              <p>1415 NE 63rd St, Oklahoma City, OK 73111</p>
              <div className="map-container">
                <iframe
                  title="Map to Coles Garden"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.158141443653!2d-97.51900382348123!3d35.54133464010884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b2183c5a61099f%3A0xb3624e5e1b2f1e2c!2sColes%20Garden!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" // Updated to a real Google Maps embed URL
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
            
            <footer style={{textAlign: 'center', marginTop: '4rem', color: '#777'}}>
                <p>© 2027 The Bowens. All Rights Reserved.</p>
                <p>With love, from the future Mr. & Mrs. Bowen</p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};