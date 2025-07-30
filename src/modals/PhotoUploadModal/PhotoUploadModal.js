import React, { useState } from 'react';
import { uploadImage } from '../../services/galleryService';
import { formatBytes } from '../../utils/formatters';
import styles from './PhotoUploadModal.module.css';

// STEP 1: Import the icon image from its path
import cloudIcon from '../../assets/images/cloud-computing.png';

const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
    // ... all of your existing state and handler functions remain the same ...
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
            if (uploadStates[file.name]?.success) {
                uploadedUrls.push(uploadStates[file.name].url);
                continue;
            }
            setUploadStates(prev => ({ ...prev, [file.name]: { ...prev[file.name], progress: 1 } }));

            const reader = new FileReader();
            reader.readAsDataURL(file);

            await new Promise(resolve => {
                reader.onloadend = async () => {
                    const result = await uploadImage(reader.result);
                    if (result.success) {
                        uploadedUrls.push(result.url);
                        setUploadStates(prev => ({ ...prev, [file.name]: { progress: 100, success: true, url: result.url } }));
                    } else {
                        setUploadStates(prev => ({ ...prev, [file.name]: { error: result.error || 'Failed' } }));
                        hasError = true;
                    }
                    resolve();
                };
                reader.onerror = () => {
                    setUploadStates(prev => ({ ...prev, [file.name]: { error: 'Failed to read file.' } }));
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
        <div className={`simple-modal show`} onClick={handleCloseModal} role="dialog" aria-modal="true">
            <div className={`${styles['photo-upload-modal-content']}`} onClick={e => e.stopPropagation()}>
                <button className={styles['close-button']} onClick={handleCloseModal} disabled={isUploadingAll} aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" /></svg>
                </button>

                <h2 className={styles['modal-title']}>Upload and attach files</h2>
                <p className={styles['modal-subtitle']}>Upload images to the project gallery.</p>

                <div className={styles['upload-box']} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                    {/* STEP 2: Use the imported variable as the src for the image */}
                    <img src={cloudIcon} alt="Upload Cloud Icon" className={styles['cloud-upload-icon']} />
                    
                    <p className={styles['upload-text-container']}>
                        <label htmlFor="photo-upload-input" className={styles['upload-clickable-text']}>Click to upload</label>
                        <span className={styles['upload-static-text']}> or drag and drop</span>
                    </p>
                    <span className={styles['upload-hint']}>PNG, JPG or GIF</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className={styles['file-input']} id="photo-upload-input" multiple />
                </div>
                
                {/* ... The rest of your JSX remains the same ... */}
                 {selectedFiles.length > 0 && (
                    <div className={styles['file-list-container']}>
                        {selectedFiles.map((file) => {
                            const state = uploadStates[file.name] || {};
                            return (
                                <div key={file.name} className={styles['file-preview-item']}>
                                    <div className={styles['file-info']}>
                                        <div className={styles['file-icon']}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg></div>
                                        <span className={styles['file-name']}>{file.name}</span>
                                    </div>
                                    <div className={styles['file-actions']}>
                                        <div className={styles['file-status']}>
                                            {isUploadingAll && !state.success && !state.error && <div className={styles['progress-spinner']}></div>}
                                            {state.success && <div className={styles['success-icon']}></div>}
                                            {state.error && <div className={styles['error-icon']}></div>}
                                            {!isUploadingAll && !state.success && !state.error && <span className={styles['file-size']}>{formatBytes(file.size)}</span>}
                                        </div>
                                        {!isUploadingAll && <button className={styles['remove-file-button']} onClick={() => removeFile(file.name)} aria-label={`Remove ${file.name}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg></button>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {overallError && <p className={styles['overall-error-message']}>{overallError}</p>}
                <div className={styles['button-row']}>
                    {isSubmitted && !overallError ? (
                        <p className={styles['submission-success-message']}>All photos uploaded!</p>
                    ) : (
                        <button className={styles.button} onClick={handleUploadAll} disabled={selectedFiles.length === 0 || isUploadingAll}>
                            {isUploadingAll ? 'Uploading...' : 'Submit'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoUploadModal;