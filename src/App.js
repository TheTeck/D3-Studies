import React from 'react';

import './App.css';
import LineGraph from './Components/LineGraph';
import ForceNodes from './Components/ForceNodes';
import BubbleChart from './Components/BubbleChart';
import HistogramChart from './Components/HistogramChart';

function App() {
  
  return (
    <div className="App">
      <LineGraph />
      <HistogramChart />
      <ForceNodes />
      <BubbleChart />
    </div>
  );
}

export default App;
