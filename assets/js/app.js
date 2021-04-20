// Set up margins
const svgWidth = 960;
const svgHeight = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Select tag from index, append svg object
let svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append SVG group
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // // Initialize Params
  let chosenXAxis = "poverty";

// Function that updates xScale upon click
function xScale(povertyData, chosenXAxis) {
  const xLinearScale = d3.scaleLinear()
  .domain([d3.min(povertyData, d => d[chosenXAxis]) * 0.8,
    d3.max(povertyData, d => d[chosenXAxis]) * 1.2
  ])
  .range([0, innerWidth]);
  return xLinearScale;
}


//
// // Pull in data.csv
// d3.csv("assets/data/data.csv", data => {
//   //console.log(data);
// })
//
// // X axis
// let x = d3.scaleLinear()
//   .domain([0, 4000])
//   .range([0, innerWidth]);
// svg.append("g")
//   .attr("transform", "translate(0," + innerHeight + ")")
//   .call(d3.axisBottom(x));
//
// // Y axis
// let y = d3.scaleLinear()
//   .domain([0, 500000])
//   .range([innerHeight, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));
//
// // Dots
// svg.append("g")
//   .selectAll("dot")
//   .enter()
//   .append("circle")
//   .attr("cx", function (d) { return x(d.)})
