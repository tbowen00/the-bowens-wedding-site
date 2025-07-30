// src/pages/GalleryPage/GalleryPage.js
import React from 'react';
import styles from './GalleryPage.module.css';

// Placeholder images for the gallery (these will be combined with uploaded images)
const staticGalleryImages = [];

const GalleryPage = ({ onBack, uploadedImages = [] }) => { // Accepts uploadedImages prop (defaults to empty array)
    // Combine static and dynamically uploaded images. New images will appear at the end.
    const allGalleryImages = [...staticGalleryImages, ...uploadedImages];

    return (
        <div className={styles['gallery-page']}>
            <div className={styles['gallery-header']}>
                <button onClick={onBack} className={styles['back-button']}>← Back </button>
                <h1>Our Gallery</h1>
                <p>Thank you for sharing our special moments!</p>
            </div>
            <div className={styles['gallery-grid']}>
                {allGalleryImages.map((src, index) => ( // Maps over the combined list of image URLs
                    <div key={index} className={styles['gallery-item']}>
                        <img src={src} alt={`Wedding gallery image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;