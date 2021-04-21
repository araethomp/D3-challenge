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
  else if (chosenXAxis === "income") {
    label = "Household Income:";
  }
  else label = "Healthcare:";

  let toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(d => `${d.state}<br>${label} ${d[chosenXAxis]}`);

  circlesGroup.call(toolTip);

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
  // Append initial circles
  let circlesGroup = chartGroup.selectAll("circle")
    .data(povertyData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 15)
    .attr("fill", "red")
    .attr("opacity", 0.8)
    .attr("stroke", "black");

  // create group for x-axis labels
  const labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  let povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty")
    .classed("active", true)
    .text("Rate of Poverty")

  let healthcareLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "healthcare")
    .classed("active", true)
    .text("Healthcare")

  let incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income")
    .classed("active", true)
    .text("Income")

    // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Income");

  // updatetooltip function above csv import
  circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      const value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {
        chosenXAxis = value;
      //  console.log(chosenXAxis);
        // updates x scale for new data
        xLinearScale = xScale(povertyData, chosenXAxis);
        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);
        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          povertyLabel
            .classed("active", true)
            .classed("inactive", false)
          incomeLabel
            .classed("active", false)
            .classed("inactive", true)
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true)
          }
        else if (chosenXAxis === "income") {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true)
          incomeLabel
            .classed("active", true)
            .classed("inactive", false)
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true)
        }
        else {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true)
          incomeLabel
            .classed("active", false)
            .classed("inactive", true)
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false)
        }
      }
    })
}).catch(error => console.log(error));

// Citation: 
// Title: 12-Par_Hair_Metal_Conclusion (Class 3, Activity 12)
//Author: Trilogy/University of Oregon
// Date: 2021
// Code Version: 1.0
//  Availability: Class activity
