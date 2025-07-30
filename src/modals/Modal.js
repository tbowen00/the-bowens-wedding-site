import React, { useEffect } from 'react';

const Modal = ({ message, onClose }) => {
    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (message) {
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [message, onClose]);

    if (!message) return null;

    return (
      <div className={`simple-modal ${message ? 'show' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
        <div className="simple-modal-content" onClick={e => e.stopPropagation()}>
          <p>{message}</p>
          <button className="button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
};

export default Modal;