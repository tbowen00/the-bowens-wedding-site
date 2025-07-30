import React, { useState, useEffect } from 'react';
import { submitNetlifyForm } from '../../services/formService'; // Use the new form service
import { COUPLE_NAME, VENUE_ADDRESS } from '../../data/constants'; // Use centralized constants

// The state management and step logic remain the same, but the submission logic is now cleaner.
const RsvpModal = ({ isOpen, onClose, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        guests: [{ firstName: '', lastName: '' }],
        currentGuestIndex: 0,
        email: '', phone: '',
        receiveUpdates: false,
        attending: null,
        entree: { chicken: 0, pasta: 0, kids: 0 },
        accommodations: null,
        address: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    // No changes to validation or input handling logic
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
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };
    const handleGuestInputChange = (e, index) => {
        const { name, value } = e.target;
        const newGuests = [...formData.guests];
        newGuests[index] = { ...newGuests[index], [name]: value };
        setFormData(prev => ({ ...prev, guests: newGuests }));
        setErrors(prev => ({
            ...prev,
            [`guest-${index}-firstName`]: '',
            [`guest-${index}-lastName`]: ''
        }));
    };
    const handleOptionSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };
    const handleEntreeCountChange = (type, increment) => {
        setFormData(prev => {
            const newCount = Math.max(0, prev.entree[type] + increment);
            return {
                ...prev,
                entree: { ...prev.entree, [type]: newCount }
            };
        });
        setErrors(prev => ({ ...prev, entree: '' }));
    };
    const addGuest = () => {
        setFormData(prev => ({
            ...prev,
            guests: [...prev.guests, { firstName: '', lastName: '' }],
            currentGuestIndex: prev.guests.length
        }));
        setErrors({});
    };
    const removeGuest = (index) => {
        if (formData.guests.length > 1) {
            setFormData(prev => {
                const newGuests = prev.guests.filter((_, i) => i !== index);
                const newIndex = Math.min(index, newGuests.length - 1);
                return {
                    ...prev,
                    guests: newGuests,
                    currentGuestIndex: newIndex
                };
            });
            setErrors({});
        }
    };
    const prevStep = () => {
        setErrors({});
        setStep(prev => prev - 1);
    };
    const nextStep = () => {
        let currentErrors = {};
        if (step === 1) {
            formData.guests.forEach((guest, index) => {
                const firstNameError = validateField('firstName', guest.firstName);
                const lastNameError = validateField('lastName', guest.lastName);
                if (firstNameError) currentErrors[`guest-${index}-firstName`] = firstNameError;
                if (lastNameError) currentErrors[`guest-${index}-lastName`] = lastNameError;
            });
            if (formData.guests.length === 0) currentErrors.guests = 'Please add at least one guest.';
        } else if (step === 2) {
            const emailError = validateField('email', formData.email);
            if (emailError) currentErrors.email = emailError;
        } else if (step === 3) {
            if (formData.attending === null) currentErrors.attending = 'Please select if you will be attending.';
            if (formData.attending === 'yes' && Object.values(formData.entree).every(count => count === 0)) {
                currentErrors.entree = 'Please select at least one entree.';
            }
        }
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }
        setStep(prev => prev + 1);
    };


    // UPDATED: This function now uses the formService
    const handleSubmit = async () => {
        let currentErrors = {};
        if (formData.accommodations === null) currentErrors.accommodations = 'Please select if you need accommodations.';

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        onSubmit("Submitting your RSVP...");

        const dataToSubmit = {
            email: formData.email,
            phone: formData.phone,
            receiveUpdates: formData.receiveUpdates ? 'Yes' : 'No',
            attending: formData.attending,
            accommodations: formData.accommodations,
            address: formData.address,
            message: formData.message,
            guests: formData.guests.map(g => `${g.firstName} ${g.lastName}`).join('; '),
            entree_chicken: formData.entree.chicken,
            entree_pasta: formData.entree.pasta,
            entree_kids: formData.entree.kids,
        };

        // Use the abstracted service function instead of fetch
        const result = await submitNetlifyForm('rsvp', dataToSubmit);

        if (result.success) {
            console.log("RSVP Submitted:", formData);
            onSubmit(`Thank you, ${formData.guests[0].firstName}! Your RSVP has been recorded.`);
            onClose();
        } else {
            console.error("RSVP submission error:", result.error);
            onSubmit("There was an error submitting your RSVP. Please try again.");
        }
    };

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setFormData({
                guests: [{ firstName: '', lastName: '' }],
                currentGuestIndex: 0,
                email: '', phone: '',
                receiveUpdates: false,
                attending: null,
                entree: { chicken: 0, pasta: 0, kids: 0 },
                accommodations: null,
                address: '',
                message: ''
            });
            setErrors({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // JSX is updated to use constants for the header
    return (
        <div className={`rsvp-modal ${isOpen ? 'show' : ''}`} onClick={onClose} role="dialog" aria-modal="true">
            <div className="rsvp-modal-content" onClick={e => e.stopPropagation()}>
                <div className="rsvp-modal-header">
                    <h2>{COUPLE_NAME}</h2>
                    <p>{VENUE_ADDRESS}</p>
                </div>
                
                {/* ... all the same JSX for steps 1-4 ... */}
                {step === 1 && (
                    <div>
                        <p>Enter guest names to RSVP</p>
                        {formData.guests.map((guest, index) => (
                            <div key={index} style={{ marginBottom: '1rem', border: '1px solid #eee', padding: '1rem', borderRadius: '5px' }}>
                                <h4 style={{ margin: '0 0 1rem', color: '#6F4E37' }}>Guest {index + 1}</h4>
                                <div className="rsvp-form-grid">
                                    <div className="rsvp-form-field">
                                        <label htmlFor={`firstName-${index}`}>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id={`firstName-${index}`}
                                            value={guest.firstName}
                                            onChange={(e) => handleGuestInputChange(e, index)}
                                        />
                                        {errors[`guest-${index}-firstName`] && <p className="error-message">{errors[`guest-${index}-firstName`]}</p>}
                                    </div>
                                    <div className="rsvp-form-field">
                                        <label htmlFor={`lastName-${index}`}>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id={`lastName-${index}`}
                                            value={guest.lastName}
                                            onChange={(e) => handleGuestInputChange(e, index)}
                                        />
                                        {errors[`guest-${index}-lastName`] && <p className="error-message">{errors[`guest-${index}-lastName`]}</p>}
                                    </div>
                                </div>
                                {formData.guests.length > 1 && (
                                    <button
                                        className="cancel-button"
                                        onClick={() => removeGuest(index)}
                                        style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}
                                    >
                                        Remove Guest
                                    </button>
                                )}
                            </div>
                        ))}
                        {errors.guests && <p className="error-message">{errors.guests}</p>}
                        <button className="rsvp-button-outline" onClick={addGuest} style={{ width: '100%', marginBottom: '1rem' }}>
                            + Add Another Guest
                        </button>
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
                        <div className="rsvp-form-field" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '1.5rem' }}>
                            <input
                                type="checkbox"
                                name="receiveUpdates"
                                id="receiveUpdates"
                                checked={formData.receiveUpdates}
                                onChange={handleInputChange}
                                style={{ marginRight: '0.5rem', width: 'auto' }}
                            />
                            <label htmlFor="receiveUpdates" style={{ margin: 0, fontSize: '1rem', color: '#333' }}>
                                Opt-in to receive important wedding updates via email/text.
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                            <button className="button" onClick={prevStep} style={{ width: '48%' }}>← Back</button>
                            <button className="button" onClick={nextStep} style={{ width: '48%' }} disabled={!formData.email || errors.email}>Get Started</button>
                        </div>
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

                        <div className="rsvp-question">
                            <p>2. How many of each entree would you like?</p>
                            <div className="entree-counter-group">
                                <div className="entree-item">
                                    <span>Chicken</span>
                                    <div className="counter-controls">
                                        <button type="button" onClick={() => handleEntreeCountChange('chicken', -1)}>-</button>
                                        <span>{formData.entree.chicken}</span>
                                        <button type="button" onClick={() => handleEntreeCountChange('chicken', 1)}>+</button>
                                    </div>
                                </div>
                                <div className="entree-item">
                                    <span>Pasta (vegetarian)</span>
                                    <div className="counter-controls">
                                        <button type="button" onClick={() => handleEntreeCountChange('pasta', -1)}>-</button>
                                        <span>{formData.entree.pasta}</span>
                                        <button type="button" onClick={() => handleEntreeCountChange('pasta', 1)}>+</button>
                                    </div>
                                </div>
                                <div className="entree-item">
                                    <span>Kids' meal</span>
                                    <div className="counter-controls">
                                        <button type="button" onClick={() => handleEntreeCountChange('kids', -1)}>-</button>
                                        <span>{formData.entree.kids}</span>
                                        <button type="button" onClick={() => handleEntreeCountChange('kids', 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                            {errors.entree && <p className="error-message">{errors.entree}</p>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                            <button className="button" onClick={prevStep} style={{ width: '48%' }}>← Back</button>
                            <button className="button" onClick={nextStep} style={{ width: '48%' }} disabled={formData.attending === null || (formData.attending === 'yes' && Object.values(formData.entree).every(count => count === 0))}>Next</button>
                        </div>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                            <button className="button" onClick={prevStep} style={{ width: '48%' }}>← Back</button>
                            <button className="button" onClick={handleSubmit} style={{ width: '48%' }}>Save Response</button>
                        </div>
                    </div>
                )}
                <button className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default RsvpModal;