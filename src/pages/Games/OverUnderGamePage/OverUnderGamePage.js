import React, { useState } from 'react';
import styles from './OverUnderGamePage.module.css';

// Import data, services, and components from their new centralized locations
import { overUnderQuestions } from '../../../data/gameQuestions';
import { submitNetlifyForm } from '../../../services/formService';
import CheckIcon from '../../../components/common/CheckIcon';

const OverUnderGamePage = ({ onBack }) => {
  // The initial form state is now derived from the imported questions data.
  const initialFormData = overUnderQuestions.reduce((acc, question) => {
    acc[question.id] = null;
    return acc;
  }, {});
  
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Input handling logic remains the same.
  const handlePredictionChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // The handleSubmit function is now simplified to use the form service.
  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentErrors = {};
    overUnderQuestions.forEach(question => {
      if (formData[question.id] === null) {
        currentErrors[question.id] = 'Please select Over or Under.';
      }
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      alert('Please answer all questions before submitting!');
      return;
    }

    // Call the abstracted service function
    const result = await submitNetlifyForm('over-under-game', formData);

    if (result.success) {
      alert('Over/Under predictions submitted successfully!');
      console.log('Over/Under Game Submitted:', formData);
      setFormData(initialFormData); // Reset form
      onBack(); // Navigate back
    } else {
      console.error('Submission error:', result.error);
      alert('There was an error submitting your game. Please try again.');
    }
  };

  // The JSX rendering logic remains the same.
  return (
    <div className={styles['game-page']}>
      <div className={styles['game-header']}>
        <button onClick={onBack} className={styles['back-button']}>← Back</button>
        <h1>Over/Under Game</h1>
        <p>Make your predictions!</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* The hidden input is no longer needed here because the service handles it */}
        <div className={styles['game-content']}>
          {overUnderQuestions.map((q) => (
            <div key={q.id} className={styles['question-item']}>
              <p className={styles['question-text']}>{q.question}</p>
              <div className={styles['line-container']}>
                  <span>Line: {q.line}</span>
              </div>
              <div className={styles['prediction-buttons']}>
                <button
                  type="button"
                  onClick={() => handlePredictionChange(q.id, 'over')}
                  className={`${styles['prediction-button']} ${formData[q.id] === 'over' ? styles['selected'] : ''}`}
                >
                  {formData[q.id] === 'over' && <CheckIcon />}
                  Over
                </button>
                <button
                  type="button"
                  onClick={() => handlePredictionChange(q.id, 'under')}
                  className={`${styles['prediction-button']} ${formData[q.id] === 'under' ? styles['selected'] : ''}`}
                >
                  {formData[q.id] === 'under' && <CheckIcon />}
                  Under
                </button>
              </div>
              {errors[q.id] && <p className={styles['error-message']}>{errors[q.id]}</p>}
            </div>
          ))}
        </div>

        <button type="submit" className={styles['submit-button']}>Submit Predictions</button>
      </form>
    </div>
  );
};

export default OverUnderGamePage;