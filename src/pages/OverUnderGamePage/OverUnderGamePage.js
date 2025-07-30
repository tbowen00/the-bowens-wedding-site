// src/pages/OverUnderGamePage/OverUnderGamePage.js
import React, { useState } from 'react';
import styles from './OverUnderGamePage.module.css';

const OverUnderGamePage = ({ onBack }) => {
  // Define your Over/Under questions and lines
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

  // Initialize formData to store 'over' or 'under' for each question
  const initialFormData = questions.reduce((acc, question) => {
    acc[question.id] = null; // null, 'over', or 'under'
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when changed
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let currentErrors = {};
    // Validate that all questions have been answered
    questions.forEach(question => {
      if (formData[question.id] === null) {
        currentErrors[question.id] = 'Please select Over or Under.';
      }
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      alert('Please answer all questions before submitting!'); // Simple alert for now
      return;
    }

    try {
      // Prepare data for Netlify Forms
      const dataToSubmit = {
        "form-name": "over-under-game",
        ...formData,
        // Optional: Add a field for who is submitting (e.g., if you add a name input later)
        // submitterName: "Guest Name"
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
      setFormData(initialFormData); // Reset form
      onBack(); // Go back to the home page after submission

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your game. Please try again.');
    }
  };

  return (
    <div className={styles['game-page']}>
      <div className={styles['game-header']}>
        <button onClick={onBack} className={styles['back-button']}>← Back</button>
        <h1>Over/Under Game</h1>
        <p>Make your predictions!</p>
      </div>
      
      {/* The actual form for Netlify to detect */}
      <form name="over-under-game" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="over-under-game" />
        {/* Hidden field for honeypot if you want to add it here too */}
        {/* <input type="text" name="bot-field" style={{ display: 'none' }} /> */}
        
        <div className={styles['game-content']}>
          {questions.map((q) => (
            <div key={q.id} className={styles['question-item']}>
              <p className={styles['question-text']}>{q.question}</p>
              <div className={styles['line-container']}>
                  <span>Line: {q.line}</span>
              </div>
              <div className={styles['prediction-buttons']}>
                <button
                  type="button" // Important: type="button" to prevent accidental form submission
                  name={q.id}
                  value="over"
                  onClick={handleChange}
                  className={`${styles['prediction-button']} ${formData[q.id] === 'over' ? styles['selected'] : ''}`}
                >
                  Over
                </button>
                <button
                  type="button"
                  name={q.id}
                  value="under"
                  onClick={handleChange}
                  className={`${styles['prediction-button']} ${formData[q.id] === 'under' ? styles['selected'] : ''}`}
                >
                  Under
                </button>
              </div>
              {errors[q.id] && <p className="error-message">{errors[q.id]}</p>}
            </div>
          ))}
        </div>

        <button type="submit" className={`button ${styles['submit-button']}`}>Submit Predictions</button>
      </form>
    </div>
  );
};

export default OverUnderGamePage;