// src/pages/BingoGamePage/BingoGamePage.js
import React, { useState } from 'react';
import styles from './BingoGamePage.module.css'; // Specific styles for this page

const BingoGamePage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    bingoCardNumber: '', // Example field
    // Add more fields as needed for your game
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!formData.bingoCardNumber) { // Example validation
      alert('Please enter your Bingo Card Number!');
      return;
    }

    try {
      // Netlify Form Submission
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "bingo-game", ...formData }) // IMPORTANT: form-name must match hidden form in public/
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Bingo game submitted successfully!');
      console.log('Bingo Game Submitted:', formData);
      setFormData({ bingoCardNumber: '' }); // Reset form
      // Optionally, navigate back or show a success message
      onBack();

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your game. Please try again.');
    }
  };

  return (
    <div className={styles['game-page']}>
      <div className={styles['game-header']}>
        <button onClick={onBack} className={styles['back-button']}>← Back</button>
        <h1>Bingo Game</h1>
        <p>Mark your cards and submit when you have Bingo!</p>
      </div>
      
      {/* The actual form for Netlify to detect */}
      <form name="bingo-game" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="bingo-game" />
        
        <div className={styles['game-content']}>
          {/* Example Bingo Input */}
          <label htmlFor="bingoCardNumber">Your Bingo Card Number:</label>
          <input type="text" name="bingoCardNumber" id="bingoCardNumber" value={formData.bingoCardNumber} onChange={handleChange} />
          
          {/* Add more game-specific inputs/checkboxes here for actual Bingo game play */}
          <p>This is where your interactive Bingo card or other game elements would go.</p>
        </div>

        <button type="submit" className={`button ${styles['submit-button']}`}>Submit Bingo Card</button>
      </form>
    </div>
  );
};

export default BingoGamePage;