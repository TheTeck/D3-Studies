import React, { useRef, useState, useEffect} from 'react';
import * as d3 from 'd3';

import './HistogramChart.css';

const scores = [
    { name: 'Simon', score: 80 },
    { name: 'Mary', score: 90 },
    { name: 'John', score: 60 },
    { name: 'Vicky', score: 100 },
    { name: 'Peter', score: 35 }
]

const width = 800;
const height = 400;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

export default function HistogramChart (props) {

    const [data] = useState(scores)
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('height', height)
            .attr('width', width)
            .attr('viewbox', [0, 0, width, height])

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])

        svg
            .append('g')
            .attr('fill', 'royalblue')
            .selectAll('rect')
            .data(data.sort((a, b) => d3.descending(a.score, b.score)))
            .join('rect')
                .attr('x', (d, i) => x(i) + x.bandwidth()/4)
                .attr('y', height - margin.bottom)
                .attr('height', 0)
                .attr('width', x.bandwidth()/2)
                .attr('class', 'rectangle')
                .transition()
                    .duration(1000)
                    .delay((d, i) => i * 100)
                    .attr('height', d => y(0) - y(d.score))
                    .attr('y', d => y(d.score))
                .transition()
                    .duration(300)
                    .attr('x', (d, i) => x(i))
                    .attr('width', x.bandwidth())

        function xAxis (g) {
            g
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat((d, i) => data[i].name).tickSize(10).tickPadding(5))
                .attr('font-size', '20px')
        }

        function yAxis (g) {
            g
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, data.format). tickSize(10))
                .attr('font-size', '20px')
        }
        

        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        svg.node();
    }, [data])


    return (
            <svg ref={svgRef}></svg>
    )
}