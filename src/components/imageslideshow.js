import React, { useState, useEffect } from 'react';

// --- IMPORT YOUR VENUE IMAGES ---
import royalGarden from '../assets/WEDDINGS-THE-ROYAL-GARDEN-10.webp';
import waterfall2 from '../assets/WEDDINGS-Waterfall-02.webp';
import waterfall3 from '../assets/WEDDINGS-Waterfall-03.webp';
import waterfall6 from '../assets/WEDDINGS-Waterfall-06.webp';

const ImageSlideshow = () => {
  const images = [ royalGarden, waterfall2, waterfall3, waterfall6 ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [images.length]);

  return (
    <div className="image-column">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slideshow-image ${index === currentIndex && isLoaded ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
          aria-label="Slideshow image of Coles Garden"
        ></div>
      ))}
      <div className="slideshow-overlay">
      </div>
    </div>
  );
};

export default ImageSlideshow;
