import React from 'react';

import './App.css';
import LineGraph from './Components/LineGraph';
import ForceNodes from './Components/ForceNodes';
import BubbleChart from './Components/BubbleChart';
import HistogramChart from './Components/HistogramChart';
import MultiBarChart from './Components/MultiBarChart';
import HorizontalBar from './Components/HorizontalBars';
import LetterTransition from './Components/LetterTransition';

function App() {
  
  return (
    <div className="App">
      {/* <HorizontalBar />
      <LineGraph />
      <HistogramChart />
      <MultiBarChart />
      <ForceNodes />
      <BubbleChart /> */}
      <LetterTransition />
    </div>
  );
}

export default App;
