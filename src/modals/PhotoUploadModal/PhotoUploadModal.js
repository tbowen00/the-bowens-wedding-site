// src/modals/PhotoUploadModal/PhotoUploadModal.js
import React, { useState } from 'react';
import styles from './PhotoUploadModal.module.css';

const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    // --- REPLACE THESE WITH YOUR ACTUAL CLOUDINARY CREDENTIALS ---
    // Use your Cloud Name
    const CLOUDINARY_CLOUD_NAME = 'dtmhmxqiw'; // <--- UPDATED
    // Use the exact name of your UNSIGNED upload preset from Cloudinary Settings -> Upload -> Upload presets
    const CLOUDINARY_UPLOAD_PRESET = 'wedding_upload_preset'; // <--- YOU STILL NEED TO REPLACE THIS with the name you chose in Cloudinary!
    // -----------------------------------------------------------

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadError('');
        } else {
            setSelectedFile(null);
            setPreviewUrl('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file first.');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `http://googleusercontent.com/api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Image upload failed.');
            }

            const data = await response.json();
            console.log('Uploaded image data:', data);
            
            onUploadSuccess(data.secure_url);
            
            setSelectedFile(null);
            setPreviewUrl('');
            onClose();

        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError(error.message || 'Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`simple-modal ${isOpen ? 'show' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
            <div className={`simple-modal-content ${styles['photo-upload-modal-content']}`} onClick={e => e.stopPropagation()}>
                <h2 className="rsvp-modal-header">Upload Your Photos</h2>
                <p>Share your favorite moments from our special day!</p>
                
                {previewUrl && (
                    <div className={styles['image-preview-container']}>
                        <img src={previewUrl} alt="Selected preview" className={styles['image-preview']} />
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles['file-input']}
                    id="photo-upload-input"
                />
                <label htmlFor="photo-upload-input" className={styles['file-input-label']}>
                    {selectedFile ? selectedFile.name : 'Choose Photo'}
                </label>

                {uploadError && <p className={styles['error-message']}>{uploadError}</p>}

                <button
                    className={`button ${styles['upload-button']}`}
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                </button>
                <button className="cancel-button" onClick={onClose} disabled={isUploading}>Cancel</button>
            </div>
        </div>
    );
};

export default PhotoUploadModal;