$(document).ready(function() {
  var data = generateData();
  createSVGVis(data);
});

function createSVGVis(data) {

  var leftMarginWidth = 45;
  var width = 800;
  var height = 600;

  var barPadding = 2;
  var barWidth = (width / data.length) - barPadding

  var yScale = d3.scale.linear()
    .domain([0, d3.max(data)])
      .rangeRound([0, height - 10])

  var format = d3.format('+')
  var yAxis = d3.svg.axis()
    .scale(yScale.copy().rangeRound([height - 10, 0]))
    .tickFormat(format)
    .orient('right');

  var svg = d3.select('body').append('svg')
    .attr('width', width).attr('height', height);
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', function(d, i) {
      return barWidth;
    })
    .attr('x', function(d, i) {
      return (i * ((width -leftMarginWidth) / data.length)) + leftMarginWidth;
    })
    .attr('y', function(d, i) {
      return height - yScale(d);
    })
    .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.floor((255 / d3.max(data))*d) +")";
    })
    .attr('height', function(d) {
      return yScale(d);
    });
  svg.append('g').call(yAxis).attr('class', 'axis')
}

function generateData() {
  var data = [];
  for (var i = 0; i < 60; i++) {
    data[i] = Math.random() * 2000;
  }
  return data;
}
