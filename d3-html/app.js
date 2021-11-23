const canvas = d3.select(".canva");

//const dataArray = [44, 120, 180, 166, 330]

const dataArray = [
    { width: 25, height: 4, fill: 'pink' },
    { width: 25, height: 14, fill: 'purple' },
    { width: 25, height: 44, fill: 'orange' },
    { width: 25, height: 124, fill: 'green' },
    { width: 25, height: 12, fill: 'blue' },
    { width: 25, height: 88, fill: 'red' }
]

const svg = canvas.append("svg")
                .attr('width', 600)
                .attr('height', 600)

const rects = svg.selectAll("rect");

rects.data(dataArray)
    .enter().append("rect")
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", d => d.fill)
    .attr("x", (d, i) => i * 26)
    .attr("y", d => 150 - d.height)
