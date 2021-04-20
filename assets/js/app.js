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
  else if (chosenXAxis === "healthcare") {
    label = "Healthcare:";
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
d3.csv("assets/data/data.csv").then(povertyData => {
  povertyData.forEach(data =>{
    data.poverty = +data.poverty
    data.healthcare = +data.healthcare
    data.income = +data.income
  })
  // xScale
  let xLinearScale = xScale(povertyData, chosenXAxis);
  // yScale
  const yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(povertyData, d=> d.healthcare)])
    .range([height, 0]);
  // create axis functions
  const bottomAxis = d3.axisBottom(xLinearScale);
  const leftAxis = d3.axisLeft(yLinearScale);
  // Append x axis
  let xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  // Append y axis
  chartGroup.append("g")
    .call(leftAxis);  
})
