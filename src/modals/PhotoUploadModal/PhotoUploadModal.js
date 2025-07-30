// src/modals/PhotoUploadModal/PhotoUploadModal.js
import React, { useState } from 'react';
import styles from './PhotoUploadModal.module.css';

// A helper function to format file size
const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStates, setUploadStates] = useState({});
    const [isUploadingAll, setIsUploadingAll] = useState(false);
    const [overallError, setOverallError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const addFiles = (newFiles) => {
        const validFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
        setSelectedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            validFiles.forEach(newFile => {
                if (!updatedFiles.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)) {
                    updatedFiles.push(newFile);
                }
            });
            return updatedFiles;
        });
        setUploadStates(prevStates => {
            const newUploadStates = { ...prevStates };
            validFiles.forEach(file => {
                if (!newUploadStates[file.name]) {
                    newUploadStates[file.name] = { progress: 0, error: '', success: false, url: '' };
                }
            });
            return newUploadStates;
        });
        setOverallError('');
        setIsSubmitted(false);
    };

    const handleFileChange = (event) => {
        if (event.target.files) addFiles(event.target.files);
        event.target.value = null;
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.currentTarget.classList.remove(styles['drag-over']);
        addFiles(event.dataTransfer.files);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add(styles['drag-over']);
    };

    const handleDragLeave = (event) => {
        event.currentTarget.classList.remove(styles['drag-over']);
    };

    const removeFile = (fileNameToRemove) => {
        setSelectedFiles(prev => prev.filter(file => file.name !== fileNameToRemove));
        setUploadStates(prev => {
            const newStates = { ...prev };
            delete newStates[fileNameToRemove];
            return newStates;
        });
        setOverallError('');
    };

    const handleUploadAll = async () => {
        if (selectedFiles.length === 0) {
            setOverallError('Please select at least one file to upload.');
            return;
        }

        setIsUploadingAll(true);
        setOverallError('');
        const uploadedUrls = [];
        let hasError = false;

        for (const file of selectedFiles) {
            if (uploadStates[file.name]?.success && uploadStates[file.name]?.url) {
                uploadedUrls.push(uploadStates[file.name].url);
                continue;
            }

            setUploadStates(prev => ({ ...prev, [file.name]: { ...prev[file.name], progress: 1, error: '', success: false } }));

            const reader = new FileReader();
            reader.readAsDataURL(file);

            await new Promise(resolve => {
                reader.onloadend = async () => {
                    const base64data = reader.result;
                    try {
                        const response = await fetch('/.netlify/functions/upload-image', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ file: base64data }),
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || 'Upload failed.');
                        }
                        const data = await response.json();
                        uploadedUrls.push(data.secure_url);
                        setUploadStates(prev => ({ ...prev, [file.name]: { ...prev[file.name], progress: 100, success: true, url: data.secure_url } }));
                    } catch (error) {
                        setUploadStates(prev => ({ ...prev, [file.name]: { ...prev[file.name], error: error.message || 'Failed', success: false } }));
                        hasError = true;
                    } finally {
                        resolve();
                    }
                };
                reader.onerror = () => {
                    setUploadStates(prev => ({ ...prev, [file.name]: { ...prev[file.name], error: 'Failed to read file.', success: false } }));
                    hasError = true;
                    resolve();
                };
            });
        }

        setIsUploadingAll(false);

        if (!hasError) {
            onUploadSuccess(uploadedUrls);
            setIsSubmitted(true);
        } else {
            setOverallError('Some photos failed to upload. Please review errors above.');
        }
    };

    const handleCloseModal = () => {
        setSelectedFiles([]);
        setUploadStates({});
        setIsSubmitted(false);
        setOverallError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={`simple-modal ${isOpen ? 'show' : ''}`} onClick={handleCloseModal} role="dialog" aria-modal="true">
            <div className={`simple-modal-content ${styles['photo-upload-modal-content']}`} onClick={e => e.stopPropagation()}>
                <button className={styles['close-button']} onClick={handleCloseModal} disabled={isUploadingAll} aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" /></svg>
                </button>

                <h2 className={styles['modal-title']}>Upload and attach files</h2>
                <p className={styles['modal-subtitle']}>Upload images to the project gallery.</p>

                <div className={`${styles['upload-box']}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/cloud-computing.png`} alt="Upload Cloud Icon" className={styles['cloud-upload-icon']} />
                    <p className={styles['upload-text-container']}>
                        <label htmlFor="photo-upload-input" className={styles['upload-clickable-text']}>Click to upload</label>
                        <span className={styles['upload-static-text']}> or drag and drop</span>
                    </p>
                    <span className={styles['upload-hint']}>SVG, PNG, JPG or GIF</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className={styles['file-input']} id="photo-upload-input" multiple />
                </div>

                {selectedFiles.length > 0 && (
                    <div className={styles['file-list-container']}>
                        {selectedFiles.map((file) => {
                            const state = uploadStates[file.name] || {};
                            const isUploadingThisFile = isUploadingAll && !state.success && !state.error;
                            const isWaiting = !isUploadingAll && !state.success && !state.error;

                            return (
                                <div key={file.name} className={styles['file-preview-item']}>
                                    <div className={styles['file-info']}>
                                        <div className={styles['file-icon']}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" />
                                            </svg>
                                        </div>
                                        <span className={styles['file-name']}>{file.name}</span>
                                    </div>

                                    <div className={styles['file-actions']}>
                                        <div className={styles['file-status']}>
                                            {isWaiting && <span className={styles['file-size']}>{formatBytes(file.size)}</span>}
                                            {isUploadingThisFile && <div className={styles['progress-spinner']}></div>}
                                            {state.success && <div className={styles['success-icon']}></div>}
                                            {state.error && <div className={styles['error-icon']}></div>}
                                        </div>
                                        {!isUploadingAll && (
                                            <button className={styles['remove-file-button']} onClick={() => removeFile(file.name)} aria-label={`Remove ${file.name}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {overallError && <p className={styles['overall-error-message']}>{overallError}</p>}

                <div className={styles['button-row']}>
                    {isSubmitted && !overallError.includes('failed') ? (
                        <p className={styles['submission-success-message']}>
                            All photos uploaded to the <button onClick={handleCloseModal} className={styles['gallery-link']}>gallery</button>!
                        </p>
                    ) : (
                        <button
                            className={styles.button}
                            onClick={handleUploadAll}
                            disabled={selectedFiles.length === 0 || isUploadingAll}
                        >
                            {isUploadingAll ? 'Uploading...' : 'Submit'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoUploadModal;