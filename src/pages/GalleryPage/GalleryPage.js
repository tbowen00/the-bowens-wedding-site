// src/pages/GalleryPage/GalleryPage.js
import React from 'react';
import styles from './GalleryPage.module.css';

// Placeholder images for the gallery (these will be combined with uploaded images)
const staticGalleryImages = [
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542042162597-26b0a037624c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520854221256-1741762c4355?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519702213-911b339178f0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1457088927869-d4c3917d5977?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533783447171-4ac397191136?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519225731998-1e4a682542a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518049362265-d5b2a6467659?auto=format&fit=crop&w=800&q=80',
];

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