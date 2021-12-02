import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const width = 1000;
const height = 1000;

// const graph = {
//     nodes: [
//         { name: 'A' },
//         { name: 'B' }
//     ],
//     links: [
//         { source: 'A', target: 'B' }
//     ]
// }

let nodeX = 10;
let nodeY = 10;
let linkLength = 30;
let graph = { nodes: [], links: [] };

for (let i = 0; i < nodeX * nodeY; i++) {
    graph.nodes.push({ name: '' + i });
}

for (let j = 0; j < nodeY; j++) {
    for (let i = 0; i < nodeX; i++) {
        if (i < nodeX - 1)
            graph.links.push({ source: '' + (j * nodeX + i), target: '' + (j * nodeX + i + 1) })
        if ( j < nodeY - 1)
            graph.links.push({ source: '' + (j * nodeX + i), target: '' + ((j + 1) * nodeX + i) })
    }
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
            .force("charge", d3.forceManyBody().strength(-30))
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
                .attr('r', 75)
                .attr('fill', 'transparent')
                .call(drag)
            
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
            <meter max='100' min='min' value='50'></meter>
            <details>
                <summary>Force-Directed Data</summary>
                <p>All the data is represented as nodes and are linked together with forces pushing them apart thanks to D3</p>
            </details>
            <svg ref={svgRef}></svg>
        </div>
    )
}