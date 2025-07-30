import React, { useState, useRef, useEffect } from 'react';

// Pages
import HomePage from './pages/HomePage/HomePage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import OverUnderGamePage from './pages/Games/OverUnderGamePage/OverUnderGamePage';
import BingoGamePage from './pages/Games/BingoGamePage/BingoGamePage';

// Modals
import RsvpModal from './modals/RsvpModal/RsvpModal';
import PhotoUploadModal from './modals/PhotoUploadModal/PhotoUploadModal';
import Modal from './components/common/Modal';

// Layout Components
import Navigation from './components/layout/Navigation/Navigation';
import ImageSlideshow from './components/layout/ImageSlideshow/ImageSlideshow';

// A small component to hold the hidden Netlify forms for detection
const NetlifyForms = () => (
    <>
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
    </>
);


function App() {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [targetSection, setTargetSection] = useState(null);
  
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const previousPageRef = useRef('home');


  // --- HANDLER FUNCTIONS ---
  const handleNavigate = (id) => {
    setIsNavOpen(false);

    const pageRoutes = ['gallery', 'over-under', 'bingo'];
    
    if (pageRoutes.includes(id)) {
      previousPageRef.current = currentPage;
      setCurrentPage(id);
      window.scrollTo(0, 0);
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
      setTargetSection(id);
    }
  };

  const handleBack = () => {
    const prevPage = previousPageRef.current || 'home';
    setCurrentPage(prevPage);
    window.scrollTo(0, 0);
  };
  
  const handlePhotoUploadSuccess = () => {
    setIsPhotoUploadModalOpen(false);
    handleNavigate('gallery');
  };

  // This function now ONLY handles non-home pages
  const renderPage = () => {
    switch(currentPage) {
        case 'gallery':
            return <GalleryPage onBack={handleBack} />;
        case 'over-under':
            return <OverUnderGamePage onBack={handleBack} />;
        case 'bingo':
            return <BingoGamePage onBack={handleBack} />;
        default:
            return null; // Should not be reached if logic is correct
    }
  };


  // --- MAIN RENDER ---
  return (
    <>
      <NetlifyForms />

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
      
      {/* NEW LOGIC: Conditionally render the entire layout.
        If the page is 'home', show the two-column layout.
        Otherwise, show only the specific page component.
      */}
      {currentPage === 'home' ? (
        <div className="app-container">
          <Navigation 
              onNavigate={handleNavigate} 
              isNavOpen={isNavOpen} 
              setIsNavOpen={setIsNavOpen} 
          />
          <ImageSlideshow />
          <main className="content-column">
              <HomePage 
                  onNavigate={handleNavigate}
                  onRsvpClick={() => setIsRsvpModalOpen(true)}
                  onUploadClick={() => setIsPhotoUploadModalOpen(true)}
                  targetSection={targetSection}
                  onScrollComplete={() => setTargetSection(null)}
              />
          </main>
        </div>
      ) : (
        renderPage()
      )}
    </>
  );
}

export default App;