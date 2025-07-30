import React, { useState, useEffect } from 'react';
import styles from './ImageSlideshow.module.css';

// CORRECTED: The path now has three ../ to go up to the src directory
import image1 from '../../../assets/images/WEDDINGS-THE-ROYAL-GARDEN-10.webp';
import image2 from '../../../assets/images/WEDDINGS-Waterfall-02.webp';
import image3 from '../../../assets/images/WEDDINGS-Waterfall-03.webp';
import image4 from '../../../assets/images/WEDDINGS-Waterfall-06.webp';

const ImageSlideshow = () => {
  const images = [image1, image2, image3, image4];

  // The rest of the component code remains the same...
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
      <div className={styles['monogram-overlay']}>
        <div className={styles['monogram-text']}>T | B</div>
      </div>
    </div>
  );
};

export default ImageSlideshow;