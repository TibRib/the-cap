chart = {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
    
    svg.append("g")
        .attr("fill", "steelblue")
      .selectAll("rect")
      .data(bins)
      .join("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
        .attr("y", d => y(d.length))
        .attr("height", d => y(0) - y(d.length));
  
    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    return svg.node();
  }