// src/modals/PhotoUploadModal/PhotoUploadModal.js
import React, { useState } from 'react';
import styles from './PhotoUploadModal.module.css';

const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const CLOUDINARY_CLOUD_NAME = 'dtmhmxqiw';
    const CLOUDINARY_UPLOAD_PRESET = 'wedding_upload_preset';

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadProgress(0);
            setUploadError('');
            setUploadSuccess(false);
        } else {
            setSelectedFile(null);
            setPreviewUrl('');
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadProgress(0);
            setUploadError('');
            setUploadSuccess(false);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file to upload.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setUploadError('');
        setUploadSuccess(false);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
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
            setUploadProgress(100);
            setUploadSuccess(true);
            setIsUploading(false);

            onUploadSuccess(data.secure_url);

        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError(error.message || 'Failed to upload image. Please try again.');
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleSubmit = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={`simple-modal ${isOpen ? 'show' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
            <div className={`simple-modal-content ${styles['photo-upload-modal-content']}`} onClick={e => e.stopPropagation()}>
                <button className={styles['close-button']} onClick={onClose} disabled={isUploading}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                <h2 className={styles['modal-title']}>Upload and attach files</h2>
                <p className={styles['modal-subtitle']}>Upload and attach files to this project.</p>

                <div
                    className={`${styles['upload-box']} ${selectedFile ? styles['has-file'] : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {!selectedFile ? (
                        <>
                            {/* REPLACED SVG WITH IMG TAG */}
                            <img src={`${process.env.PUBLIC_URL}/assets/images/cloud-computing.png`} alt="Upload Cloud Icon" className={styles['cloud-upload-icon']} />
                            <label htmlFor="photo-upload-input" className={styles['upload-text-prompt']}>
                                Click to upload or drag and drop
                            </label>
                            <span className={styles['upload-hint']}>SVG, PNG, JPG or GIF (max. file size, consider adding limits)</span>
                            <input
                                type="file"
                                accept="image/svg+xml,image/png,image/jpeg,image/gif"
                                onChange={handleFileChange}
                                className={styles['file-input']}
                                id="photo-upload-input"
                            />
                        </>
                    ) : (
                        <div className={styles['file-preview-item']}>
                            <div className={styles['file-thumbnail']}>
                                {previewUrl && <img src={previewUrl} alt="Selected preview" className={styles['thumbnail-image']} />}
                            </div>
                            <div className={styles['file-details']}>
                                <p className={styles['file-name']}>{selectedFile.name}</p>
                                <p className={styles['file-size']}>{Math.round(selectedFile.size / 1024)} KB</p>
                                
                                {isUploading && (
                                    <div className={styles['progress-wrapper']}>
                                        <div className={styles['progress-bar']} style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                )}
                                {uploadSuccess && <span className={styles['upload-status']}><svg viewBox="0 0 24 24" fill="currentColor" className={styles['success-icon']}><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.769 2.769 8.792-13.188a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg> Uploaded</span>}
                                {uploadError && <p className={styles['error-message']}>{uploadError}</p>}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles['button-row']}>
                    <button
                        className={`button ${styles['upload-button']}`}
                        onClick={handleUpload}
                        disabled={isUploading || uploadSuccess || !selectedFile}
                    >
                        {isUploading ? 'Uploading...' : (uploadSuccess ? 'Uploaded!' : 'Upload Photo')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoUploadModal;