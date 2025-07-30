// src/pages/GalleryPage/GalleryPage.js
import React, { useState, useEffect } from 'react';
import styles from './GalleryPage.module.css';

const GalleryPage = ({ onBack }) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of image URLs from our new function when the page loads
        fetch('/.netlify/functions/get-images')
            .then(res => res.json())
            .then(data => {
                setImages(data.urls || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to load gallery images:", error);
                setIsLoading(false);
            });
    }, []); // The empty array ensures this runs only once when the component mounts

    return (
        <div className={styles['gallery-page']}>
            <div className={styles['gallery-header']}>
                <button onClick={onBack} className={styles['back-button']}>← Back</button>
                <h1>Our Gallery</h1>
                <p>Thank you for sharing our special moments!</p>
            </div>
            <div className={styles['gallery-grid']}>
                {isLoading ? (
                    <p>Loading gallery...</p>
                ) : (
                    images.map((src, index) => (
                        <div key={index} className={styles['gallery-item']}>
                            <img src={src} alt={`Wedding gallery image ${index + 1}`} />
                        </div>
                    ))
                )}
                {!isLoading && images.length === 0 && <p>No photos have been uploaded yet. Be the first!</p>}
            </div>
        </div>
    );
};

export default GalleryPage;