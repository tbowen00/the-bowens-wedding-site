import React, { useState, useEffect } from 'react';
import { getImages } from '../../services/galleryService'; // Use the service
import styles from './GalleryPage.module.css';

const GalleryPage = ({ onBack }) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            const fetchedImages = await getImages(); // Call the service
            setImages(fetchedImages);
            setIsLoading(false);
        };
        loadImages();
    }, []);

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
                    // Use the unique 'id' for the key prop
                    images.map((image) => (
                        <div key={image.id} className={styles['gallery-item']}>
                            <img src={image.url} alt={`Wedding gallery image`} />
                        </div>
                    ))
                )}
                {!isLoading && images.length === 0 && <p>No photos have been uploaded yet. Be the first!</p>}
            </div>
        </div>
    );
};

export default GalleryPage;