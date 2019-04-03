function donutChart() {
		var width,
				height,
				margin = {top: 10, right: 10, bottom: 10, left: 10},
				colour = d3.scaleOrdinal(d3.schemeCategory20c),
				variable,
				category,
				padAngle,
				floatFormat = d3.format('.4r'),
				cornerRadius,
				percentFormat = d3.format(',.2%');
		
		function chart(selection){
				
				selection.each(function(data) {
						
						var radius = Math.min(width, height) / 2;

						var pie = d3.pie()
								.value(function(d) { return floatFormat(d[variable]); })
								.sort(null);

						var arc = d3.arc()
								.outerRadius(radius*0.8)
								.innerRadius(radius*0.6)
								.cornerRadius(cornerRadius)
								.padAngle(padAngle)

						var outerArc = d3.arc()
								.outerRadius(radius*0.9)
								.innerRadius(radius*0.9);
						
						// append the svg object to the selection
						var svg = selection.append('g')
								.attr('transform', 'translate(' + 350 +',' + 200 +')');

						svg.append('g').attr('class', 'slices');
						svg.append('g').attr('class', 'labelName');
						svg.append('g').attr('class', 'lines'); 

						var path = svg.select('.slices')
								.datum(data).selectAll('path')
								.data(pie)
						  .enter().append('path')
								.attr('fill', function(d) { return colour(d.data[category]); })
								.attr('d', arc);

						// add text labels
						var label = svg.select('.labelName').selectAll('text')
								.data(pie)
						  .enter().append('text')
								.attr('dy', '.35em')
								.html(function(d) {
										return percentFormat(d.data[variable]);
								})
								.attr('transform', function(d) {
										var pos = outerArc.centroid(d);

										pos[0] = radius*0.95*(midAngle(d) < Math.PI ? 1 : -1);
										return 'translate('+ pos + ')';
								})
								.style('text-anchor', function(d) {
										return (midAngle(d)) < Math.PI ? 'start' : 'end';
								});
						

						// add lines connecting labels to slice. A polyline creates straight lines connecting several points
						var polyline = svg.select('.lines')
								.selectAll('polyline')
								.data(pie)
							.enter().append('polyline')
								.attr('points', function(d) {
										var pos = outerArc.centroid(d);
										pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
										return [arc.centroid(d), outerArc.centroid(d), pos]
									
								});
						
						// calculates the angle for the middle of a slice
						function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; } 
				});		
				
		}		
		
		// getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.padAngle = function(value) {
        if (!arguments.length) return padAngle;
        padAngle = value;
        return chart;
    };

    chart.cornerRadius = function(value) {
        if (!arguments.length) return cornerRadius;
        cornerRadius = value;
        return chart;
    };

    chart.colour = function(value) {
        if (!arguments.length) return colour;
        colour = value;
        return chart;
    };

    chart.variable = function(value) {
        if (!arguments.length) return variable;
        variable = value;
        return chart;
    };

    chart.category = function(value) {
        if (!arguments.length) return category;
        category = value;
        return chart;
    };	

		return chart
}














    
