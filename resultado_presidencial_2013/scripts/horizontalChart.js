
function showHorizontalBar(data_horizontal,divName){
	var  h_horizontal=25
	    ,w_horizontal=180
	    ,margin_horizontal=0
	    ,color_horizontal = d3.scale.category10()

	    ,x_horizontal = d3.scale.ordinal()
		.domain(d3.range(data_horizontal[0].length+1))
		.rangeRoundBands([margin_horizontal,w_horizontal-margin_horizontal], .1)

	    ,y_horizontal = d3.scale.linear()
		.range([h_horizontal-margin_horizontal,0+margin_horizontal])

	    ,xAxis_horizontal = d3.svg.axis().scale(x_horizontal).orient("bottom").tickSize(6, 0)
	    ,yAxis_horizontal = d3.svg.axis().scale(y_horizontal).orient("left")


	barStack(data_horizontal)
	y_horizontal.domain(data_horizontal.extent)


	svg_horizontal = d3.select("#"+divName)
	    .append("svg")
	    .attr("height",h_horizontal)
	    .attr("width",w_horizontal)

	svg_horizontal.selectAll(".series").data(data_horizontal)
	    .enter().append("g").classed("series",true).style("fill", function(d,i) { return d[0].color})
		.selectAll("rect").data(Object)
		.enter().append("rect")
		    

	redraw(data_horizontal,1500,x_horizontal,y_horizontal,h_horizontal,margin_horizontal,w_horizontal,svg_horizontal,yAxis_horizontal,xAxis_horizontal)
}




function redraw(data,duration,x_horizontal,y_horizontal,h_horizontal,margin_horizontal,w_horizontal,svg_horizontal,yAxis_horizontal,xAxis_horizontal) {
    
        /* Readjust the range to witdh and height */
        x_horizontal.rangeRoundBands([h_horizontal-margin_horizontal,0+margin_horizontal], .1)
        y_horizontal.range([margin_horizontal,w_horizontal-margin_horizontal])
        
        /* Reposition and redraw axis */
        svg_horizontal.select(".y.axis")
            .transition().duration(duration)
            .attr("transform","translate (0 "+x_horizontal(0)+")")
            .call(yAxis_horizontal.orient("bottom"))

        /* Reposition the elements */
        svg_horizontal.selectAll(".series rect")
            .transition().duration(duration)
            .attr("y",function(d,i) { return x_horizontal(1)})
            .attr("x",function(d) { return y_horizontal(d.y0-d.size)})
            .attr("width",function(d) { return y_horizontal(d.size)-y_horizontal(0)})
            .attr("height",x_horizontal.rangeBand())

}

function barStack(d) {
    var l = d[0].length
    while (l--) {
        var posBase = 0, negBase = 0;
        d.forEach(function(d) {
            d=d[l]
            d.size = Math.abs(d.y)
            d.y0 = posBase = posBase + d.size  
        })
    }
    d.extent= d3.extent(d3.merge(d3.merge(d.map(function(e) { return e.map(function(f) { return [f.y0,f.y0-f.size]})}))))
    return d
}