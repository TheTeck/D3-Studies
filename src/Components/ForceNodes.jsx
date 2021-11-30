import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const width = 600;
const height = 400;

const graph = {
    nodes: [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' },
        { name: 'F' },
        { name: 'G' },
        { name: 'H' },
        { name: 'I' },
        { name: 'J' }
    ],
    links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'A' },
        { source: 'E', target: 'A' },
        { source: 'F', target: 'B' },
        { source: 'G', target: 'C' },
        { source: 'H', target: 'D' },
        { source: 'E', target: 'F' },
        { source: 'G', target: 'H' },
        { source: 'I', target: 'A' },
        { source: 'I', target: 'D' },
        { source: 'I', target: 'E' },
        { source: 'J', target: 'B' },
        { source: 'J', target: 'C' },
        { source: 'J', target: 'G' }
    ]
}

export default function ForceNodes (props) {

    const svgRef = useRef();
    const [data, setData] = useState(graph);

    useEffect(() => {
        let svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height)

        let simulation = d3
            .forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.name))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);
        
        let link = svg
            .append('g')
            .selectAll('line')
            .data(data.links)
            .enter()
            .append('line')
                .attr('stroke-width', 3)
                .style('stroke', 'pink')
        
        let node = svg
            .append('g')
            .selectAll('circle')
            .data(data.nodes)
            .enter() 
            .append('circle')
                .attr('r', 5)
                .attr('fill', 'orange')
                .attr('stroke', 'yellow')
                
        node.on('click', changeColor)
        
        function changeColor (d) {
            d3.select(this).attr('fill', 'red')
        }
        
        function ticked () {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y)

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
        }
     })
    
    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}