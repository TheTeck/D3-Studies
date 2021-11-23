import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import './App.css';
import { message } from './message';

const height = 500;
const width = 960;
const csvUrl = 'https://gist.githubusercontent.com/JosephStalnaker/539ae314a112da952df3e5b9af7eef48/raw/c0457df5300920603141bce472b4996a8b3d2a2a/cssNamedColors.csv';

function App() {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl).then(setData);
  }, [])

  return (
    <div className="App">
      Data is { data ? message(data) : 'loading' }
    </div>
  );
}

export default App;
