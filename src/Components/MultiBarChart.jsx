import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const temps = [
    [56, 57, 59, 62, 63, 64, 62, 59, 55, 52],
    [35, 35, 36, 37, 40, 45, 50, 57, 67, 65]
];

const width = 1000;
const height = 400;
const marginX = 50;
const marginY = 30;
const groupLength = temps[0].length;

export default function MultiBarChart (props) {

    const [data] = useState([...temps[0], ...temps[1]]);

    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', width + marginX + marginX)
            .attr('height', height + marginY + marginY)

        const x = d3.scaleBand()
            .domain(d3.range(groupLength))
            .range([marginX, width + marginX])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([20, 80])
            .range([height, marginY])

        svg
            .append('g')
            .selectAll('rect')
            .data(data)
                .join('rect')
                    .attr('fill', (d, i) => i < groupLength ? "royalBlue": "blue")
                    .attr('x', (d, i) => i < groupLength ? x(i % groupLength) + x.bandwidth() / 2 : x(i % groupLength))
                    .attr('y', d => y(d))
                    .attr('height', d => y(20) - y(d))
                    .attr('width', x.bandwidth()/2)

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickFormat(i => i))
            .attr('font-size', '20px')

        svg.append('g')
            .attr('transform', `translate(${marginX}, 0)`)
            .call(d3.axisLeft(y).ticks(null, data.format))
            .attr('font-size', '20px')
        
        svg.node();
    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    )
}