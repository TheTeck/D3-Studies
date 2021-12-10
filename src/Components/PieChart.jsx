import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { pie } from 'd3';


const data = [
    { item: 'A', count: 590 },
    { item: 'B', count: 291 },
    { item: 'C', count: 348 },
    { item: 'D', count: 145 },
    { item: 'E', count: 46 }
]

export default function PieChart (props) {

    const pieChart = useRef();

    useEffect(() => {
        // Get position for each data object
        const pieData = d3.pie().value(d => d.count)(data)

        console.log(pieData)

        // Define arcs
        const arc = d3.arc().innerRadius(100).outerRadius(200);

        const colors = d3.scaleOrdinal(['red','green','blue','orange','purple'])

        // Define the size and position of svg
        const svg = d3.select(pieChart.current)
                        .attr('width', 600)
                        .attr('height', 600)
                        .style('background-color', 'black')
                        .append('g')
                            .attr('transform', 'translate(300, 300)')

        // Add tooltip
        const toolDiv = d3.select('#chart-area')
                            .append('div')
                            .style('visibility', 'hidden')
                            .style('position', 'absolute')
                            .style('background-color', 'white')

        // Draw the pie chart
        svg.append('g')
            .selectAll('path')
            .data(pieData)
            .join('path')
                .attr('d', arc)
                .attr('fill', (d, i) => colors(i))
                .attr('stroke', 'white')
                .on('mouseover', (e, d) => {
                    toolDiv
                        .style('visibility', 'visible')
                        .text(`${d.data.item}: ${d.data.count}`)
                })
                .on('mousemove', (e, d) => {
                    toolDiv
                        .style('top', (e.pageY - 50) + 'px')
                        .style('left', (e.pageX - 50) + 'px')
                })
                .on('mouseout', () => {
                    toolDiv
                        .style('visibility', 'hidden')
                })
    })

    return (
        <div id="chart-area">
            <svg ref={pieChart}></svg>
        </div>
    )
}