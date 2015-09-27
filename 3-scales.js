$(document).ready(function() {
  var data = generateData();
  createSVGVis(data);
});

function createSVGVis(data) {

  var width = 800;
  var height = 600;
  var barPadding = 2;

  var scale = d3.scale.linear()
    .domain([0, d3.max(data)]).rangeRound([0, height - 10])

  var svg = d3.select('body').append('svg')
    .attr('width', width).attr('height', height);
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', function(d, i) {
      return (width / data.length) - barPadding;
    })
    .attr('x', function(d, i) {
      return (i * (width / data.length));
    })
    .attr('y', function(d, i) {
      return height - scale(d);
    })
    .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.floor((255 / d3.max(data))*d) +")";
    })
    .attr('height', function(d) {
      return scale(d);
    });
}

function generateData() {
  var data = [];
  for (var i = 0; i < 100; i++) {
    data[i] = Math.random() * 2000;
  }
  return data;
}
