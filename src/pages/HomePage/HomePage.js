import React, { useRef, useEffect } from 'react';

// Step 1: Import the VENUE_MAP_URL constant along with the others
import { SPOTIFY_EMBED_URL, SPOTIFY_SHARE_URL, VENUE_MAP_URL } from '../../data/constants';

// Import all the section components
import WelcomeSection from './sections/WelcomeSection';
import ScheduleSection from './sections/ScheduleSection';
import MenuSection from './sections/MenuSection';
import PhotoUploadSection from './sections/PhotoUploadSection';
import GalleryLinkSection from './sections/GalleryLinkSection';
import HotelsSection from './sections/HotelsSection';
import GamesSection from './sections/GamesSection';
import SpotifySection from './sections/SpotifySection';
import RegistrySection from './sections/RegistrySection';
import DirectionsSection from './sections/DirectionsSection';

const HomePage = ({ onNavigate, onRsvpClick, onUploadClick, targetSection, onScrollComplete }) => {
    const sectionRefs = {
        schedule: useRef(null),
        menu: useRef(null),
        photos: useRef(null),
        gallery: useRef(null),
        games: useRef(null),
        spotify: useRef(null),
        registry: useRef(null),
        directions: useRef(null),
    };

    useEffect(() => {
        if (targetSection && sectionRefs[targetSection]?.current) {
            sectionRefs[targetSection].current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            onScrollComplete();
        }
    }, [targetSection, onScrollComplete, sectionRefs]);

    return (
        <div className="content-wrapper">
            <WelcomeSection onRsvpClick={onRsvpClick} onScrollToDetails={() => onNavigate('schedule')} />
            <ScheduleSection sectionRef={sectionRefs.schedule} />
            <MenuSection sectionRef={sectionRefs.menu} />
            <PhotoUploadSection sectionRef={sectionRefs.photos} onUploadButtonClick={onUploadClick} />
            <GalleryLinkSection sectionRef={sectionRefs.gallery} onViewGallery={() => onNavigate('gallery')} />
            <HotelsSection sectionRef={sectionRefs.hotels} />
            <GamesSection
                sectionRef={sectionRefs.games}
                onOverUnderClick={() => onNavigate('over-under')}
                onBingoClick={() => onNavigate('bingo')}
            />
            <SpotifySection 
                sectionRef={sectionRefs.spotify} 
                embedUrl={SPOTIFY_EMBED_URL}
                shareUrl={SPOTIFY_SHARE_URL}
            />
            <RegistrySection sectionRef={sectionRefs.registry} />
            {/* Step 2: Pass the imported URL as a prop to the component */}
            <DirectionsSection 
                sectionRef={sectionRefs.directions} 
                mapUrl={VENUE_MAP_URL}
            />

            <footer style={{textAlign: 'center', marginTop: '4rem', color: '#777'}}>
                <p>© 2027 The Bowen's. All Rights Reserved.</p>
                <p>With love, from the future Mr. & Mrs. Bowen</p>
            </footer>
        </div>
    );
};

export default HomePage;