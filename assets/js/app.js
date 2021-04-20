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

// updates xScale upon click on axis label
function xScale(povertyData, chosenXAxis) {
  const xLinearScale = d3.scaleLinear()
  .domain([d3.min(povertyData, d => d[chosenXAxis]) * 0.8,
    d3.max(povertyData, d => d[chosenXAxis]) * 1.2
  ])
  .range([0, innerWidth]);
  return xLinearScale;
}

// updates xAxis upon click on axis label
function renderAxes(newXScale, xAxis) {
  const bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}

// updates circles group with transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));
  return circlesGroup;
}

// updates circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
  let label;
  if (chosenXAxis === "poverty") {
    label = "Poverty:";
  }
  else if (chosenXAxis === "age") {
    label = "Age:";
  }
  else { label = "Household Income:";
  }

  let toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(d => `${d.state}<br>${label} ${d[chosenXAxis]}`);

  circlesGroup.call(tooltip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    .on("mouseout", function(data) {
      toolTip.hide(data);
  })
  return circlesGroup;
}

// Pull in data.csv
d3.csv("assets/data/data.csv", data => {
  console.log(data);
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
