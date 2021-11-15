import React, { useState, useCallback } from 'react';

import './App.css';
  
// const data = [
  //   { "country": "China", "population": 1415046},
  //   { "country": "India", "population": 1354052},
  //   { "country": "United States", "population": 326767},
  //   { "country": "Indonesia", "population": 266795},
  //   { "country": "Brazil", "population": 210868},
  //   { "country": "Pakistan", "population": 200814},
  //   { "country": "Nigeria", "population": 195875},
  //   { "country": "Bangladesh", "population": 166368},
  //   { "country": "Russia", "population": 143965},
  //   { "country": "Mexico", "population": 130759}
  // ]
  
const height = 500;
const width = 960;
const circleRadius = 30;
const initialMousePos = { x: width / 2, y : height / 2};
  
function App() {
  
  const [mousePos, setMousePos] = useState(initialMousePos);

  const handleMouseMove = useCallback(e => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY })
  }, [setMousePos])
  
  const svg = <svg width={width} height={height} onMouseMove={handleMouseMove}>
    <circle cx={mousePos.x} cy={mousePos.y} r={circleRadius} />
  </svg>

  return (
    <div className="App">
      {svg}
    </div>
  );
}

export default App;
