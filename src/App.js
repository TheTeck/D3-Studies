import { select, json } from 'd3';

import './App.css';

function App() {

  const data = [
    { "country": "China", "population": 1415046},
    { "country": "India", "population": 1354052},
    { "country": "United States", "population": 326767},
    { "country": "Indonesia", "population": 266795},
    { "country": "Brazil", "population": 210868},
    { "country": "Pakistan", "population": 200814},
    { "country": "Nigeria", "population": 195875},
    { "country": "Bangladesh", "population": 166368},
    { "country": "Russia", "population": 143965},
    { "country": "Mexico", "population": 130759}
  ]

  const svg = select('svg');

  const height = +svg.attr('height');
  const width = +svg.attr('width');

  data.forEach(d => {
    d.population = d.population * 1000;
  })

  console.log(data)



  return (
    <div className="App">
        {width} X {height}
    </div>
  );
}

export default App;
