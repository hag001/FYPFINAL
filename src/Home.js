// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this path is correct

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Word-Based Game</h1>
      <div className="button-container">
        <Link to="/game" className="home-button">Start Game</Link>
        <Link to="/dashboard" className="home-button">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;
