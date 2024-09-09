// src/Question.js
import React, { useState } from 'react';
import images from './imageLoader';

const Question = ({ question, handleAnswer, difficulty }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const imageUrl = images[question.image_url];
   
  console.log('imageUrl:', imageUrl);

  const onSubmit = (e) => {
    e.preventDefault();
    handleAnswer(userAnswer);
    setUserAnswer('');
  };

  return (
    <div>
      <h2>Difficulty: {difficulty}</h2>
      
      {difficulty === 'easy' && <p>{question.question}</p>}
      {difficulty === 'medium' && question.image_url && (
        <img src={imageUrl} style={{ width: '400px', height: 'auto' }} alt="Guess the word" />
      )}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Question;
