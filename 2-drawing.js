$(document).ready(function() {
  var data = generateData();
  //createHTMLVis(data);
  createSVGVis(data);
});

function createHTMLVis(data) {
  d3.select('body').selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', function(d) {
      return d + 'px';
    });
}

function createSVGVis(data) {
  var width = 500;
  var height = 110;
  var barPadding = 2;
  var svg = d3.select('body').append('svg')
    .attr('width', 500).attr('height', 120);
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
      return height - d;
    })
    .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.floor((255 / 100)*d) +")";
    })
    .attr('height', function(d) {
      return d + 'px';
    });
}

function generateData() {
  var data = [];
  for (var i = 0; i < 10; i++) {
    data[i] = Math.random() * 100;
  }
  return data;
}
