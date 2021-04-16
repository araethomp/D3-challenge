// Set dimensions and margins
const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const innerWidth = 460 - margin.left - margin.right;
const innerHeight = 400 - margin.top - margin.bottom;



// Select tag from index
let selectTag = d3.select("#scatter");

// Pull in data.csv
d3.csv("assets/data/data.csv", data => {
  console.log(data);
})
