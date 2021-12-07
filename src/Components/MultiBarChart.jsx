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

export default function MultiBarChart (props) {

    const [data, setData] = useState(temps[0]);
    const [data2, setData2] = useState(temps[1]);

    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', width + marginX + marginX)
            .attr('height', height + marginY + marginY)

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([marginX, width + marginX])
            .padding(0.2)

        const y = d3.scaleLinear()
            .domain([20, 80])
            .range([height, marginY])

        svg
            .append('g')
            .attr('fill', 'royalblue')
            .selectAll('rect')
            .data(data)
            .join('rect')
                .attr('x', (d, i) => x(i))
                .attr('y', d => y(d))
                .attr('height', d => y(20) - y(d))
                .attr('width', x.bandwidth()/2)
                .on('mouseover', showValue)
                .on('mouseleave', hideValue)
        
        svg
            .append('g')
            .attr('fill', 'blue')
            .selectAll('rect')
            .data(data2)
            .join('rect')
                .attr('x', (d, i) => x(i) + x.bandwidth()/2)
                .attr('y', d => y(d))
                .attr('height', d => y(20) - y(d))
                .attr('width', x.bandwidth()/2)
                .on('mouseover', showValue)
                .on('mouseleave', hideValue)

        const generateScaledLine = d3.line()
            .x((d, i) => x(i))
            .y(y)
            .curve(d3.curveCardinal)
              
        svg.selectAll('.line')
            .data([data])
            .join('path')
                .attr('d', d => generateScaledLine(d))
                .attr('fill', 'none')
                .attr('stroke', 'orange')
                .attr('stroke-width', 3)
                .attr('transform', `translate(${x.bandwidth()/4}, 0)`)
        
        svg.selectAll('.line')
            .data([data2])
            .join('path')
                .attr('d', d => generateScaledLine(d))
                .attr('fill', 'none')
                .attr('stroke', 'pink')
                .attr('stroke-width', 3)
                .attr('transform', `translate(${(x.bandwidth()/4) * 3}, 0)`)

        function showValue () {
            this.parentNode.appendChild(this);

            d3.select(this)
                .transition()
                    .duration(300)
                    .attr('transform', `translate(-100, 0)`)
                    .attr('width', 200)
                    .attr('height', 200)
                    .attr('stroke', 'purple')
                    .attr('stroke-width', 4)
                    .attr('zindex', 3)
        }

        function hideValue () {
            d3.select(this)
                .transition()
                    .duration(300)
                    .attr('transform', 'translate(0, 0)')
                    .attr('width', x.bandwidth()/2)
                    .attr('height', d =>y(20) - y(d))
                    .attr('stroke', 'none')
        }

        function xAxis (g) {
            g
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickFormat(i => i))
                .attr('font-size', '20px')
        }

        function yAxis (g) {
            g
                .attr('transform', `translate(${marginX}, 0)`)
                .call(d3.axisLeft(y).ticks(null, data.format))
                .attr('font-size', '20px')
        }
        

        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        svg.node();
    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    )
}