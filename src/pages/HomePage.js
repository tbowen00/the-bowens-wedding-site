// src/pages/HomePage.js
import React, { useState, useRef, useEffect } from 'react';

// Import components
import ImageSlideshow from '../components/ImageSlideshow/ImageSlideshow';
import Navigation from '../components/Navigation/Navigation';
import Modal from '../components/Modal/Modal';

// Import modals
import RsvpModal from '../modals/RsvpModal/RsvpModal';
import PhotoUploadModal from '../modals/PhotoUploadModal/PhotoUploadModal';

// Import sections
import WelcomeSection from '../sections/WelcomeSection';
import ScheduleSection from '../sections/ScheduleSection';
import MenuSection from '../sections/MenuSection';
import PhotoUploadSection from '../sections/PhotoUploadSection';
import GalleryLinkSection from '../sections/GalleryLinkSection';
import HotelsSection from '../sections/HotelsSection';
import GamesSection from '../sections/GamesSection';
import SpotifySection from '../sections/SpotifySection';
import RegistrySection from '../sections/RegistrySection';
import DirectionsSection from '../sections/DirectionsSection';

// Import pages
import GalleryPage from './GalleryPage/GalleryPage';
import OverUnderGamePage from './OverUnderGamePage/OverUnderGamePage';
import BingoGamePage from './BingoGamePage/BingoGamePage';


export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');
  const previousPageRef = useRef('home');

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const mainContentRef = useRef(null);
  const sectionRefs = {
    schedule: useRef(null), menu: useRef(null), hotels: useRef(null),
    photos: useRef(null),
    games: useRef(null), spotify: useRef(null),
    registry: useRef(null), directions: useRef(null),
  };

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  const handleNavigate = (id) => {
    setIsNavOpen(false);
    
    previousPageRef.current = currentPage;

    if (id === 'gallery' || id === 'over-under' || id === 'bingo') {
      setCurrentPage(id);
      return;
    }
    
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (sectionRefs[id] && sectionRefs[id].current) {
          sectionRefs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    } else {
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

  const handlePhotoUploadSuccess = (imageUrls) => {
    previousPageRef.current = currentPage;
    setIsPhotoUploadModalOpen(false);
    setCurrentPage('gallery');
  };

  const handleBack = () => {
    setCurrentPage(previousPageRef.current || 'home');
  };

  if (currentPage === 'gallery') {
    return <GalleryPage onBack={handleBack} />;
  } else if (currentPage === 'over-under') {
    return <OverUnderGamePage onBack={handleBack} />;
  } else if (currentPage === 'bingo') {
    return <BingoGamePage onBack={handleBack} />;
  }

  return (
    <>
      {/* Hidden forms for Netlify */}
      <form name="rsvp" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="rsvp" />
        <input type="text" name="bot-field" />
      </form>
      <form name="over-under-game" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="over-under-game" />
        <input type="text" name="bot-field" />
      </form>
      <form name="bingo-game" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="bingo-game" />
        <input type="text" name="bot-field" />
      </form>

      {/* Background Audio */}
      <audio ref={audioRef} autoPlay loop style={{ display: 'none' }}>
        <source src={`${process.env.PUBLIC_URL}/yoursong.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpModalOpen}
        onClose={() => setIsRsvpModalOpen(false)}
        onSubmit={(message) => setModalMessage(message)}
      />
      <PhotoUploadModal
        isOpen={isPhotoUploadModalOpen}
        onClose={() => setIsPhotoUploadModalOpen(false)}
        onUploadSuccess={handlePhotoUploadSuccess}
      />
      <Modal message={modalMessage} onClose={() => setModalMessage('')} />

      <div className="app-container">
        <Navigation onNavigate={handleNavigate} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <ImageSlideshow />
        <main className="content-column">
          <div className="content-wrapper">
            
            <WelcomeSection onRsvpClick={() => setIsRsvpModalOpen(true)} onScrollToDetails={handleViewDetails} />
            <ScheduleSection sectionRef={sectionRefs.schedule} />
            <MenuSection sectionRef={sectionRefs.menu} />
            <PhotoUploadSection
                sectionRef={sectionRefs.photos}
                onUploadButtonClick={() => setIsPhotoUploadModalOpen(true)}
            />
            {/* THIS IS THE CORRECTED LINE */}
            <GalleryLinkSection onViewGallery={() => handleNavigate('gallery')} />

            <HotelsSection sectionRef={sectionRefs.hotels} />
            <GamesSection
                sectionRef={sectionRefs.games}
                onOverUnderClick={() => handleNavigate('over-under')}
                onBingoClick={() => handleNavigate('bingo')}
            />
            <SpotifySection
              sectionRef={sectionRefs.spotify}
              embedUrl="https://open.spotify.com/embed/playlist/1IW9C77E5NwUXJs6o4QplP?utm_source=generator&theme=0"
              shareUrl="https://open.spotify.com/playlist/1IW9C77E5NwUXJs6o4QplP?si=c4913a7a5e2b4597&pt=572466659f5f5734e20c096e41cd8bdb"
            />
            <RegistrySection sectionRef={sectionRefs.registry} />
            <DirectionsSection
              sectionRef={sectionRefs.directions}
              mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.158141443653!2d-97.51900382348123!3d35.54133464010884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b2183c5a61099f%3A0xb3624e5e1b2f1e2c!2sColes%20Garden!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            />
            
            <footer style={{textAlign: 'center', marginTop: '4rem', color: '#777'}}>
                <p>© 2027 The Bowens. All Rights Reserved.</p>
                <p>With love, from the future Mr. & Mrs. Bowen</p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}