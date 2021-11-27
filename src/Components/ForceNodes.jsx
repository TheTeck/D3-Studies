import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const width = 600;
const height = 400;

const graph = {
    nodes: [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Chen' },
        { name: 'Dan' },
        { name: 'Ethan' },
        { name: 'Frank' },
        { name: 'Hans' }
    ],
    links: [
        { source: 'Alice', target: 'Bob' },
        { source: 'Chen', target: 'Bob' },
        { source: 'Dan', target: 'Chen' },
        { source: 'Hans', target: 'Frank' },
        { source: 'Hans', target: 'Ethan'}
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
            .force("charge", d3.forceManyBody().strength(-30))
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