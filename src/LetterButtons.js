import React from 'react';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

function LetterButtons({ onGuess, guessedLetters, disabled }) {
  return (
    <div className="letter-buttons">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter) || disabled}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default LetterButtons;
