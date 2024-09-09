import React from 'react';

const Scoreboard = ({ score, timer }) => {
  return (
    <div>
      <h2>Time: {timer} seconds</h2>
    </div>
  );
};

export default Scoreboard;