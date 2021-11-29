import React, { useRef, useState } from 'react';
import * as d3 from 'd3';

const data = [
    { name: 'Simon', score: 80 },
    { name: 'Mary', score: 90 },
    { name: 'John', score: 60 }
]

const width = 800;
const height = 400;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

export default function HistogramChart (props) {

    const svgRef = useRef();
    const svg = d3.select(svgRef.current)
        .attr('height', height - margin.top - margin.bottom)
        .attr('width', width - margin.left - margin.right)
        .attr('viewbox', [0, 0, width, height])

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top])

    return (
        <svg ref={svgRef}></svg>
    )
}