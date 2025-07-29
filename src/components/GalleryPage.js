// GalleryPage.js
import React from 'react';

// Placeholder images for the gallery - UPDATED with unique URLs
const galleryImages = [
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542042162597-26b0a037624c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520854221256-1741762c4355?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519702213-911b339178f0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1457088927869-d4c3917d5977?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533783447171-4ac397191136?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519225731998-1e4a682542a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518049362265-d5b2a6467659?auto=format&fit=crop&w=800&q=80',
];

const GalleryPage = ({ onBack }) => {
    return (
        <div className="gallery-page">
            <div className="gallery-header">
                <button onClick={onBack} className="back-button">← Back </button>
                <h1>Our Gallery</h1>
                <p>Thank you for sharing our special moments!</p>
            </div>
            <div className="gallery-grid">
                {galleryImages.map((src, index) => (
                    <div key={index} className="gallery-item">
                        <img src={src} alt={`Wedding gallery image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;