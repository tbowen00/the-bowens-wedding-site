// RsvpModal.js
import React, { useState, useEffect } from 'react';

const RsvpModal = ({ isOpen, onClose, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        attending: null, entree: '', accommodations: null,
        address: '', message: ''
    });
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        if (name === 'firstName' && !value.trim()) error = 'First Name is required.';
        if (name === 'lastName' && !value.trim()) error = 'Last Name is required.';
        if (name === 'email') {
            if (!value.trim()) error = 'Email is required.';
            else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email address is invalid.';
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };
    
    const handleOptionSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        let currentErrors = {};
        if (step === 1) {
            const firstNameError = validateField('firstName', formData.firstName);
            const lastNameError = validateField('lastName', formData.lastName);
            if (firstNameError) currentErrors.firstName = firstNameError;
            if (lastNameError) currentErrors.lastName = lastNameError;
        } else if (step === 2) {
            const emailError = validateField('email', formData.email);
            if (emailError) currentErrors.email = emailError;
        } else if (step === 3) {
            if (formData.attending === null) currentErrors.attending = 'Please select if you will be attending.';
            if (formData.entree === '') currentErrors.entree = 'Please select an entree.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }
        setStep(prev => prev + 1);
    };

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    };

    const handleSubmit = async () => {
        // Basic validation for step 4 before submission (if needed)
        let currentErrors = {};
        if (formData.accommodations === null) currentErrors.accommodations = 'Please select if you need accommodations.';
        // Add more validation for address/message if desired

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        onSubmit("Submitting your RSVP..."); // Show temporary message

        try {
            // Perform the actual submission to Netlify
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "rsvp", "bot-field": "", ...formData }) // Include hidden form fields
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("RSVP Submitted:", formData);
            onSubmit(`Thank you, ${formData.firstName}! Your RSVP has been recorded.`);
            onClose();
        } catch (error) {
            console.error("RSVP submission error:", error);
            onSubmit("There was an error submitting your RSVP. Please try again.");
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setFormData({
                firstName: '', lastName: '', email: '', phone: '',
                attending: null, entree: '', accommodations: null,
                address: '', message: ''
            });
            setErrors({}); // Clear errors when opening
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`rsvp-modal ${isOpen ? 'show' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
            <div className="rsvp-modal-content" onClick={e => e.stopPropagation()}>
                <div className="rsvp-modal-header">
                    <h2>The Bowen's</h2>
                    <p>Oklahoma City, OK, USA</p>
                </div>

                {/* Each step will have its inputs, but they are logically part of one form */}
                {step === 1 && (
                    <div>
                        <p>Enter your name to RSVP</p>
                        <div className="rsvp-form-grid">
                            <div className="rsvp-form-field">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} />
                                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                            </div>
                            <div className="rsvp-form-field">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} />
                                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                            </div>
                        </div>
                        <button className="button" onClick={nextStep}>Next</button>
                    </div>
                )}
                
                {step === 2 && (
                    <div>
                        <div className="rsvp-form-field" style={{marginBottom: '1rem'}}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                        <div className="rsvp-form-field">
                            <label htmlFor="phone">Mobile Phone</label>
                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <button className="button" onClick={nextStep} disabled={!formData.email || errors.email}>Get Started</button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className="rsvp-question" role="radiogroup" aria-labelledby="attending-question">
                            <p id="attending-question">1. Will you be able to join us at our wedding?</p>
                            <div className="radio-group">
                                <button
                                    onClick={() => handleOptionSelect('attending', 'yes')}
                                    className={formData.attending === 'yes' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.attending === 'yes'}
                                    tabIndex={formData.attending === 'yes' ? 0 : -1}
                                >
                                    Joyfully Accept
                                </button>
                                <button
                                    onClick={() => handleOptionSelect('attending', 'no')}
                                    className={formData.attending === 'no' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.attending === 'no'}
                                    tabIndex={formData.attending === 'no' ? 0 : -1}
                                >
                                    Regretfully Decline
                                </button>
                            </div>
                            {errors.attending && <p className="error-message">{errors.attending}</p>}
                        </div>
                        <div className="rsvp-question" role="radiogroup" aria-labelledby="entree-question">
                            <p id="entree-question">2. What entree would you prefer at our wedding?</p>
                            <div className="radio-group">
                                <button
                                    onClick={() => handleOptionSelect('entree', 'chicken')}
                                    className={formData.entree === 'chicken' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.entree === 'chicken'}
                                    tabIndex={formData.entree === 'chicken' ? 0 : -1}
                                >
                                    Chicken
                                </button>
                                <button
                                    onClick={() => handleOptionSelect('entree', 'pasta')}
                                    className={formData.entree === 'pasta' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.entree === 'pasta'}
                                    tabIndex={formData.entree === 'pasta' ? 0 : -1}
                                >
                                    Pasta (vegetarian)
                                </button>
                                <button
                                    onClick={() => handleOptionSelect('entree', 'kids')}
                                    className={formData.entree === 'kids' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.entree === 'kids'}
                                    tabIndex={formData.entree === 'kids' ? 0 : -1}
                                >
                                    Kids' meal
                                </button>
                            </div>
                            {errors.entree && <p className="error-message">{errors.entree}</p>}
                        </div>
                        <button className="button" onClick={nextStep} disabled={formData.attending === null || formData.entree === ''}>Next</button>
                    </div>
                )}
                
                {step === 4 && (
                    <div>
                        <div className="rsvp-question" role="radiogroup" aria-labelledby="accommodations-question">
                            <p id="accommodations-question">3. Will you need accommodations near our venue?</p>
                             <div className="radio-group">
                                <button
                                    onClick={() => handleOptionSelect('accommodations', 'yes')}
                                    className={formData.accommodations === 'yes' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.accommodations === 'yes'}
                                    tabIndex={formData.accommodations === 'yes' ? 0 : -1}
                                >
                                    Yes!
                                </button>
                                <button
                                    onClick={() => handleOptionSelect('accommodations', 'no')}
                                    className={formData.accommodations === 'no' ? 'selected' : ''}
                                    role="radio"
                                    aria-checked={formData.accommodations === 'no'}
                                    tabIndex={formData.accommodations === 'no' ? 0 : -1}
                                >
                                    No, thanks.
                                </button>
                            </div>
                            {errors.accommodations && <p className="error-message">{errors.accommodations}</p>}
                        </div>
                        <div className="rsvp-question">
                            <p>4. What is your mailing address?</p>
                             <div className="rsvp-form-field">
                                <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Write your answer here." />
                            </div>
                        </div>
                         <div className="rsvp-question">
                            <p>5. Share how you know the couple, wish them well or some wisdom for the future!</p>
                             <div className="rsvp-form-field">
                                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Write your answer here." />
                            </div>
                        </div>
                        <button className="button" onClick={handleSubmit}>Save Response</button>
                    </div>
                )}

                <button className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default RsvpModal;