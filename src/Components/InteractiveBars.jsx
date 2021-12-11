import React,  { useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const sample = [
    { category: 'A', values: [20, 189, 28, 31, 56], types: ['a', 'b', 'c', 'd', 'e'] },
    { category: 'B', values: [45, 121, 76, 12, 98], types: ['f', 'g', 'h', 'i', 'j'] },
    { category: 'C', values: [84, 23, 54, 51], types: ['k', 'l', 'm', 'n'] }
]

export default function InteractiveBars (props) {
    
    const [data, setData] = useState([]);

    function handleClick (e) {
        sample.forEach(each => {
            if (each.category === e.target.id) {
                setData({ values: each.values, types: each.type})
            }
        })
    }

    return (
        <div>
            <div>
                <button onClick={handleClick} id='A'>Category A</button>
                <button onClick={handleClick} id='B'>Category B</button>
                <button onClick={handleClick} id='C'>Category C</button>
            </div>
            <Plot 
                data={[
                    {
                        type: 'bar',
                        x: data.types,
                        y: data.values
                    }
                ]}
                layout = {{ 
                    width: 800,
                    height: 500,
                    title: 'Interactive Chart with Data Updates'
                }}
            />
        </div>
    )
}