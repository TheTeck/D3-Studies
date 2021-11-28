import React from 'react';

import './App.css';
import LineGraph from './Components/LineGraph';
import ForceNodes from './Components/ForceNodes';
import BubbleChart from './Components/BubbleChart';

function App() {
  
  return (
    <div className="App">
      <LineGraph />
      <ForceNodes />
      <BubbleChart />
    </div>
  );
}

export default App;
