// src/pages/OverUnderGamePage/OverUnderGamePage.js
import React, { useState } from 'react';
import styles from './OverUnderGamePage.module.css';

const OverUnderGamePage = ({ onBack }) => {
  // Your questions and Netlify form logic are untouched.
  const questions = [
    { id: 'andyCries', question: 'How many times will Andy cry on the wedding day?', line: 5.5 },
    { id: 'brooklynHappyCries', question: 'How many times will Brooklyn happy-cry throughout the day?', line: 3.5 },
    { id: 'firstKissLast', question: 'How long will the first kiss last? (in seconds)', line: 2.5 },
    { id: 'bestManDrinks', question: 'How many drinks will the best man have before his speech?', line: 2.5 },
    { id: 'groomsmanButtons', question: 'How many buttons will be undone on a groomsman’s shirt by the end of the night?', line: 3.5 },
    { id: 'yellShot', question: 'How many times will someone yell “Shot!”', line: 7.5 },
    { id: 'mispronounceNames', question: 'How many times will someone mispronounce “Brooklyn” or “Tyler” during speeches?', line: 1.5 },
    { id: 'tylerCakePieces', question: 'How many pieces of cake will Tyler eat?', line: 2.5 },
    { id: 'mrBrightsidePlayed', question: 'How many times will “Mr. Brightside” (or another go-to song) be played?', line: 1.5 },
    { id: 'congaLineAttempts', question: 'How many people will try to start a conga line?', line: 2.5 },
    { id: 'brooklynSpins', question: 'How many spins will Brooklyn do during the first dance?', line: 3.5 },
    { id: 'selfiesTaken', question: 'How many selfies will Tyler and Brooklyn take together?', line: 4.5 },
    { id: 'blurryDisposableShots', question: 'How many disposable camera shots will be blurry?', line: 18.5 },
    { id: 'kidsFallAsleep', question: 'How many kids will fall asleep at the reception?', line: 2.5 },
    { id: 'honeymoonQuestion', question: 'How many guests will say "When’s your honeymoon?"', line: 8.5 },
    { id: 'kidsQuestion', question: 'How many times will the couple be asked, “When are you having kids?”', line: 5.5 },
  ];

  const initialFormData = questions.reduce((acc, question) => {
    acc[question.id] = null;
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // This custom handleChange is needed because standard e.target.value doesn't work for our buttons
  const handlePredictionChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when changed
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentErrors = {};
    questions.forEach(question => {
      if (formData[question.id] === null) {
        currentErrors[question.id] = 'Please select Over or Under.';
      }
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      alert('Please answer all questions before submitting!');
      return;
    }

    try {
      const dataToSubmit = {
        "form-name": "over-under-game",
        ...formData,
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(dataToSubmit)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Over/Under predictions submitted successfully!');
      console.log('Over/Under Game Submitted:', formData);
      setFormData(initialFormData);
      onBack();

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your game. Please try again.');
    }
  };

  // A small checkmark icon component
  const CheckIcon = () => (
    <svg className={styles['check-icon']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className={styles['game-page']}>
      <div className={styles['game-header']}>
        <button onClick={onBack} className={styles['back-button']}>← Back</button>
        <h1>Over/Under Game</h1>
        <p>Make your predictions!</p>
      </div>
      
      <form name="over-under-game" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="over-under-game" />
        
        <div className={styles['game-content']}>
          {questions.map((q) => (
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