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
        { source: 'C', target: 'A' },
        { source: 'A', target: 'D' },
        { source: 'D', target: 'B' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'B' },
        { source: 'E', target: 'F' },
        { source: 'F', target: 'B' },
        { source: 'F', target: 'G' },
        { source: 'G', target: 'B' },
        { source: 'G', target: 'C' },
        { source: 'A', target: 'H' },
        { source: 'H', target: 'D' },
        { source: 'D', target: 'I' },
        { source: 'I', target: 'E' },
        { source: 'D', target: 'J' },
        { source: 'I', target: 'J' },
        { source: 'J', target: 'H' }
    ]
}

export default function ForceNodes (props) {

    const svgRef = useRef();
    const [data, setData] = useState(graph);

    useEffect(() => {
        d3.select('g').remove();

        let svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height)

        let simulation = d3
            .forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.name))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);
        
        let drag = d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)

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
                .call(drag)
                
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