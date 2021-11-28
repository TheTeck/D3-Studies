import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import './BubbleChart.css';

const width = 600;
const height = 400;

const graph = {
    nodes: [
        { name: 'A', radius: 10 },
        { name: 'B', radius: 15 },
        { name: 'C', radius: 50 },
        { name: 'D', radius: 35 }
    ],
    links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'D', target: 'C' },
    ]
}

export default function BubbleChart (props) {

    const svgRef = useRef();
    const [data, setData] = useState(graph);

    useEffect(() => {
        let svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background-color', 'black')
        
        svg.selectAll('g').remove();

        let simulation = d3
            .forceSimulation(data.nodes)
            .force("charge", d3.forceManyBody().strength(300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide(d => d.radius).strength(0.7))
            .on("tick", ticked);
                
        let drag = d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)

        let textAndNodes = svg
            .append('g')
            .selectAll('g')
            .data(data.nodes)
            .enter()
            .append('g')
            .call(drag)
        
        let circles = textAndNodes
            .append('circle')
            .attr('r', d => d.radius)
            .attr('fill', 'red')

        circles
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)

        function handleMouseOver (d) {
            d3.select(this)
                .attr('transform', 'scale(1.3)')
                .attr('opacity', 0.6)
                .attr('stroke', 'white')
                .attr('stroke-width', 2)
        }

        function handleMouseOut (d) {
            d3.select(this)
                .attr('transform', 'scale(1)')
                .attr('opacity', 1)
                .attr('stroke-width', 0)
                .select('text')
                    .attr('font', '30px')
        }

        let texts = textAndNodes
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .text(d => d.name)
        
        function ticked () {
            textAndNodes
                .attr('transform', d => 'translate(' + d.x + ', ' + d.y + ')')
        }

        function dragstarted (e, d) {
            simulation.alphaTarget(0.3).restart();
            d.fx = e.x;
            d.fy = e.y;
        }

        function dragged (e, d) {
            d.fx = e.x;
            d.fy = e.y;
        }

        function dragended (e, d) {
            simulation.alphaTarget(0.1);
            d.fx = null;
            d.fy = null;
        }
     })
    
    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}