import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    setGameHistory(storedHistory);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Game Dashboard</h1>
      {gameHistory.length > 0 ? (
        <ul>
          {gameHistory.map((game, index) => (
            <li key={index}>
              <p>Score: {game.score}</p>
              <p>Highest Difficulty: {game.difficulty}</p>
              <p>Date: {game.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No game history available.</p>
      )}
    </div>
  );
};

export default Dashboard;
