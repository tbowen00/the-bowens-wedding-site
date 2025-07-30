import React, { useState } from 'react';
import styles from './BingoGamePage.module.css';
import { submitNetlifyForm } from '../../../services/formService'; // Import the service

const BingoGamePage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    bingoCardNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // The handleSubmit function is now simpler and uses the form service
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bingoCardNumber) {
      alert('Please enter your Bingo Card Number!');
      return;
    }

    // Call the abstracted service function
    const result = await submitNetlifyForm('bingo-game', formData);

    if (result.success) {
      alert('Bingo game submitted successfully!');
      console.log('Bingo Game Submitted:', formData);
      setFormData({ bingoCardNumber: '' }); // Reset form
      onBack();
    } else {
      console.error('Submission error:', result.error);
      alert('There was an error submitting your game. Please try again.');
    }
  };

  // The JSX rendering logic remains the same
  return (
    <div className={styles['game-page']}>
      <div className={styles['game-header']}>
        <button onClick={onBack} className={styles['back-button']}>← Back</button>
        <h1>Bingo Game</h1>
        <p>Mark your cards and submit when you have Bingo!</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* The hidden form name input is no longer needed here; the service handles it */}
        <div className={styles['game-content']}>
          <label htmlFor="bingoCardNumber">Your Bingo Card Number:</label>
          <input 
            type="text" 
            name="bingoCardNumber" 
            id="bingoCardNumber" 
            value={formData.bingoCardNumber} 
            onChange={handleChange} 
          />
          
          <p>This is where your interactive Bingo card or other game elements would go.</p>
        </div>

        <button type="submit" className={`button ${styles['submit-button']}`}>Submit Bingo Card</button>
      </form>
    </div>
  );
};

export default BingoGamePage;