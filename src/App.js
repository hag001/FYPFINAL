// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Importing Home component
import Game from './Game';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for Home page */}
          <Route path="/game" element={<Game />} /> {/* Route for Game page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
