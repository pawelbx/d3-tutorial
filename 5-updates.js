(function ($, d3) {
  $(document).ready(function() {
    var data = generateData();
    var svg = createSVGVis(data);
  });

  function bindEventListeners(updateFunc) {
    $('.add-button').on('click', null, 'add', updateFunc);
    $('.remove-button').on('click', null, 'remove', updateFunc);
  }

  function createSVGVis(data) {
    var leftMarginWidth = 45;
    var width = 800;
    var height = 600;

    var yScale = d3.scale.linear()
          .domain([0, d3.max(data)])
          .rangeRound([0, height - 10]);

    var xScale = d3.scale.ordinal()
          .domain(d3.range(data.length))
          .rangeRoundBands([leftMarginWidth, width], 0.05);

    var yAxisFormat = d3.format('+');
    var yAxis = d3.svg.axis()
          .scale(yScale.copy().rangeRound([height - 10, 0]))
          .tickFormat(yAxisFormat)
          .orient('right');

    var svg = d3.select('body').append('svg')
          .attr('width', width).attr('height', height);

    svg.append('clipPath').attr('id', 'chart-area')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    svg.append('g').attr('id', 'bars')
      .attr('clip-path', 'url(#chart-area)')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', function(d, i) {
        return xScale.rangeBand();
      })
      .attr('x', function(d, i) {
        return xScale(i);
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
    svg.append('g').call(yAxis).attr('class', 'axis');

    var updateVis = function (event) {
      if (event.data == 'add') {
        var dataLength = data.length + 1;
        for (var i = 0; i < dataLength; i++) {
          data[i] = Math.random() * 2000;
        }
      }
      else {
        data.pop();
      }
      var bScale = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 255]);

      xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([leftMarginWidth, width], 0.05);

      yScale.domain([0, d3.max(data)]);

      var bars = svg.select('#bars')
            .selectAll('rect')
            .data(data);
      bars
        .transition()
        .duration(500)
        .delay(function(d, i) { return (i / data.length) * 1000; })
        .attr('width', function(d, i) { return xScale.rangeBand(); })
        .attr('x', function(d, i) { return xScale(i); })
        .attr('y', function(d) { return height - yScale(d); })
        .attr('width', function(d, i) { return xScale.rangeBand(); })
        .attr('height', function(d) { return yScale(d); })
        .attr('fill', function(d) { return "rgb(0, 0, " + bScale(d) +")"; })
        .each('end', function() {
          d3.select(this)
            .transition()
            .duration(1000)
            .attr('fill', function() { return "rgb(89, 0, 0)"; });
        });

      bars.enter()
        .append('rect')
        .transition()
        .duration(500)
        .delay(function(d, i) { return (i / data.length) * 1100; })
        .attr('width', function(d, i) {
          return xScale.rangeBand();
        })
        .attr('x', function(d, i) {
          return xScale(i);
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

      bars.exit()
        .transition()
        .duration(500)
        .attr('x', width)
        .remove();
    };

    bindEventListeners(updateVis);
  }

  function generateData() {
    var data = [];
    for (var i = 0; i < Math.random() * 512; i++) {
      data[i] = Math.random() * 2000;
    }
    return data;
  }
})(jQuery, d3);
