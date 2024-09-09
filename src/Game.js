import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Question from './Question';
import Scoreboard from './Scoreboard';
import './Game.css'; // Import Game-specific styles

const Game = () => {
  const navigate = useNavigate(); // Initialize useHistory hook
  const [difficulty, setDifficulty] = useState('easy');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState({
    easy: [],
    medium: [],
    hard: []
  });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [timer, setTimer] = useState(60);
  const intervalIdRef = useRef(null); // useRef for intervalId
  const handleGoToDashboard = () => {
    navigate('/'); // Navigate to the dashboard or home route
  };

  // Fetch questions from the API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/questions/')
      .then((response) => response.json())
      .then((data) => {
        const groupedQuestions = {
          easy: [],
          medium: [],
          hard: []
        };

        data.forEach((question) => {
          const difficultyLevel = question.difficulty.level.toLowerCase();
          if (groupedQuestions[difficultyLevel]) {
            groupedQuestions[difficultyLevel].push({
              question: question.question_text,
              answer: question.answer,
              image_url: question.image_url
            });
          }
        });

        // Shuffle questions
        Object.keys(groupedQuestions).forEach(level => {
          groupedQuestions[level] = shuffleArray(groupedQuestions[level]);
        });

        setQuestions(groupedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (difficulty && !isGameFinished) {
      setTimer(60); // Reset timer to 30 seconds
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);

      intervalIdRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalIdRef.current);
            setIsGameFinished(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Clear timer interval on component unmount or game finish
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [difficulty, isGameFinished]);

  const currentQuestions = questions[difficulty];

  const handleAnswer = (userAnswer) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const normalizedUserAnswer = userAnswer.toLowerCase();
    const normalizedCorrectAnswer = currentQuestion.answer.toLowerCase();

    const isAnswerCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

    if (isAnswerCorrect) {
      setScore(score + 1);
      setFeedback('Correct!');
      setIsCorrect(true);
    } else {
      setFeedback('Wrong!');
      setIsCorrect(false);
    }

    setTimeout(() => {
      setFeedback('');
      setIsCorrect(null);

      if (currentQuestionIndex + 1 < currentQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        if (difficulty === 'easy') {
          if (score < Math.ceil(questions.easy.length / 2)) {
            saveGameHistory(score, difficulty);
            setIsGameFinished(true);
            return;
          }
          setDifficulty('medium');
        } else if (difficulty === 'medium') {
          if (questions.hard.length > 0) {
            setDifficulty('hard');
          } else {
            saveGameHistory(score, difficulty);
            setIsGameFinished(true);
          }
        } else {
          saveGameHistory(score, difficulty);
          setIsGameFinished(true);
        }
        setCurrentQuestionIndex(0);
      }
    }, 1000);
  };

  const saveGameHistory = (score, difficulty) => {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const newGame = {
      score,
      difficulty,
      date: new Date().toLocaleString()
    };
    gameHistory.unshift(newGame); // Add new game to the beginning of the array
    if (gameHistory.length > 5) {
      gameHistory.pop(); // Remove oldest game if more than 5
    }
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setDifficulty('easy');
    setIsGameFinished(false);
    setTimer(60); // Reset timer
  };


  useEffect(() => {
    if (!isGameFinished) {
      setCurrentQuestionIndex(0);
    }
  }, [difficulty, isGameFinished]);

  if (loading) {
    return <h2>Loading questions...</h2>;
  }

  if (isGameFinished) {
    return (
      <div className="final-score-container">
        <h1>Game Over!</h1>
        <h2>Your final score is: {score}</h2>
        <button onClick={resetGame} className="play-again-button">Play Again</button>
        <button onClick={handleGoToDashboard}>Go to Home</button> 
      </div>
    );
  }

  return (
    <div className="game-container">
      <Scoreboard score={score} timer={timer} />
      <div className="question-container">
        <Question
          question={currentQuestions[currentQuestionIndex]}
          handleAnswer={handleAnswer}
          difficulty={difficulty}
          feedback={feedback}
          isCorrect={isCorrect}
        />
        {feedback && (
          <div className={`feedback-message ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
            {feedback}
          </div>
        )}
      </div>
      {isGameFinished && (
        <div className="final-score-container">
          <h1>Game Over!</h1>
          <h2>Your final score is: {score}</h2>
          <button onClick={resetGame}>Play Again</button>
          <button onClick={handleGoToDashboard}>Go to Home</button> {/* Added button */}
        </div>
      )}
    </div>
  );
};


export default Game;
