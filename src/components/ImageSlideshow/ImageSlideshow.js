// src/components/ImageSlideshow/ImageSlideshow.js
import React, { useState, useEffect } from 'react';
import styles from './ImageSlideshow.module.css'; // Assuming you create this module for specific slideshow overlay styles

// Note: Global slideshow classes like .slideshow-image, .slideshow-overlay are still in index.css
// If you want to move them here, you can, but requires changes in HomePage.js too.

const ImageSlideshow = () => {
  const images = [
    `${process.env.PUBLIC_URL}/assets/images/WEDDINGS-THE-ROYAL-GARDEN-10.webp`,
    `${process.env.PUBLIC_URL}/assets/images/WEDDINGS-Waterfall-02.webp`,
    `${process.env.PUBLIC_URL}/assets/images/WEDDINGS-Waterfall-03.webp`,
    `${process.env.PUBLIC_URL}/assets/images/WEDDINGS-Waterfall-06.webp`
  ];
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
    <div className="image-column"> {/* Global class from index.css */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`slideshow-image ${index === currentIndex && isLoaded ? 'active' : ''}`} /* Global class from index.css */
          style={{ backgroundImage: `url(${image})` }}
          aria-label="Slideshow image of Coles Garden"
        ></div>
      ))}
      {/* Original slideshow overlay (top text) */}
      <div className="slideshow-overlay"> {/* Global class from index.css */}
      </div>

      {/* NEW: Monogram Overlay */}
      <div className={styles['monogram-overlay']}> {/* Use module CSS for positioning */}
        <div className={styles['monogram-text']}>T | B</div> {/* Use module CSS for text styling */}
      </div>
    </div>
  );
};

export default ImageSlideshow;