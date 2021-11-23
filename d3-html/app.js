const canvas = d3.select(".canva");

const dataArray = [44, 120, 180];

// const svg = canvas.append("svg")
//                 .attr('width', 600)
//                 .attr('height', 600)
   
const svg = canvas.select("svg")
                .attr('height', 200)

const rects = svg.selectAll("rect");

rects.attr("width", 24)
    .data(dataArray)
    .attr("height", d => d)
    .attr("fill", d => `hsl(${d}, 60%, 50%)`)
    .attr("x", (d, i) => i * 25)
    .attr("y", (d, i) => 200 - d)