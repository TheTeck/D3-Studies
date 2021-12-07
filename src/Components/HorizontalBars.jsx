import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './HorizontalBar.css';

const margins = { top: 50, right: 70, bottom: 50, left: 70 };

const sample = [
    { category: 'A', value: 55 },
    { category: 'B', value: 83 },
    { category: 'C', value: 15 },
    { category: 'D', value: 99 },
    { category: 'E', value: 33 }
]

export default function HorizontalBar (props) {

    const [data] = useState(sample);
    const svgRef = useRef();

    
    useEffect(() => {
        const chartWidth = parseInt(d3.select('#hbar-box').style('width'))
            - margins.left - margins.right;
        const chartHeight = parseInt(d3.select('#hbar-box').style('height'))
            - margins.top - margins.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', chartWidth + margins.left + margins.right)
            .attr('height', chartHeight + margins.top + margins.bottom)

        const max = d3.max(data, d => d.value);

        const x = d3.scaleLinear()
            .domain([0, max])
            .range([margins.left, chartWidth])

        const y = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([chartHeight, margins.top])
            .padding(0.2)

        svg.append('g')
            .attr('transform', 'translate(0, ' + chartHeight + ')')
            .call(d3.axisBottom(x).ticks(null, data.format))
            .attr('font-size', '20px') 

        svg.append('g')
            .attr('transform', 'translate(' + margins.left + ')')
            .call(d3.axisLeft(y).tickFormat(i => data[i].category))
            .attr('font-size', '20px')

        svg.append('g')
            .attr('fill', '#65f0eb')
            .selectAll('rect')
            .data(data)
            .join('rect')
                .attr('x', margins.left)
                .attr('y', (d, i) => y(i))
                .attr('width', d => x(d.value))
                .attr('height', y.bandwidth())
    })

    return (
        <div id="hbar-box">
            <svg ref={svgRef}></svg>
        </div>
    )
}