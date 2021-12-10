import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './LetterTransition.css';

const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

export default function LetterTransition (props) {

    const svgRef = useRef();
    const [data, setData] = useState(alphabet);
    
    const svg = d3.select(svgRef.current)
    const g = svg.append('g')
                    .attr('transform', 'translate(50, 300)')

    function updateDisplay (letters) {
        const t = d3.transition()
                        .duration(1000)

        const text = g
            .selectAll('text')
            .data(letters, d => d)

        text
            .exit()
            .attr('class', 'exit')
            .transition(t)
                .attr('y', 60)
                .style('fill-opacity', 1e-6)
                .remove();

        text
            .attr('class', 'update')
            .attr('y', 0)
            .style('fill-opacity', 1)
            .transition(t)
                .attr('x', (d, i) => i * 32);

        text
            .enter().append('text')
                .attr('class', 'enter')
                .attr('dy', '.35em')
                .attr('y', -60)
                .attr('x', (d, i) => i * 32)
                .style('fill-opacity', 1e-6)
                .text(d => d)
                .transition(t)
                    .attr('y', 0)
                    .style('fill-opacity', 1);
    }

    // updateDisplay(alphabet)
    // useEffect(() => {
    //     updateDisplay(data);
    // }, [data])

    d3.interval(() => {
        setData(d3.shuffle(alphabet)
            .slice(0, ~~Math.random() * 26)
            .sort());
    }, 1500)

    return (
        <svg id="letter-svg" ref={svgRef}></svg>
    )
}