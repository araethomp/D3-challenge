// Set dimensions and margins
const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const innerWidth = 460 - margin.left - margin.right;
const innerHeight = 400 - margin.top - margin.bottom;

// Select tag from index, append svg object
let svgObject = d3.select("#scatter")
  .append("svgObject")
  .attr("width", innerWidth + margin.left + margin.right)
  .attr("height", innerHeight + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Pull in data.csv
d3.csv("assets/data/data.csv", data => {
  //console.log(data);
})

// X axis
let x = d3.scaleLinear()
  .domain([0, 4000])
  .range([0, innerWidth]);
svgObject.append("g")
  .attr("transform", "translate(0," + innerHeight + ")")
  .call(d3.axisBottom(x));

// Y axis
let y = d3.scaleLinear()
  .domain([0, 500000])
  .range([innerHeight, 0]);
svgObject.append("g")
  .call(d3.axisLeft(y));
