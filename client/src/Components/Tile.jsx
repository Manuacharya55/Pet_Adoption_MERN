import React from 'react';

const Tile = ({ count = "0", name }) => {
  return (
    <div className="stat-card">
      <span className="stat-number">{count}</span>
      <span className="stat-label">{name}</span>
    </div>
  );
};

export default Tile;