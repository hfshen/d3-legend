
d3.legend.symbol = function(){

  var scale = d3.scale.linear(),
    shape = "path",
    shapeWidth = 15,
    shapeHeight = 15,
    shapeRadius = 10,
    shapePadding = 5,
    cells = [5],
    labels = [],
    useClass = false,
    labelFormat = d3.format(".01f"),
    labelOffset = 10,
    orient = "vertical";


    function legend(svg){

      var type = d3_calcType(scale, cells, labels, labelFormat);

      var cell = svg.selectAll(".cell").data(type.data),
        cellEnter = cell.enter().append("g", ".cell").attr("class", "cell").style("opacity", 1e-6);
        shapeEnter = cellEnter.append(shape).attr("class", "swatch"),
        shapes = cell.select("g.cell " + shape);

      //remove old shapes
      cell.exit().transition().style("opacity", 0).remove();

      d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, type.feature);
      d3_addText(svg, cellEnter, type.labels)

      // sets placement
      var text = cell.select("text"),
        shapeSize = shapes[0].map( function(d){ return d.getBBox(); });


      var maxH = d3.max(shapeSize, function(d){ return d.height; }),
      maxW = d3.max(shapeSize, function(d){ return d.width; });

      var cellTrans,
      textTrans;

      //positions cells and text
      if (orient === "vertical"){
        cellTrans = function(d,i) { return "translate(0, " + (i * (maxH + shapePadding)) + ")"; };
        textTrans = function(d,i) { return "translate(" + (maxW + labelOffset) + "," +
              (shapeSize[i].y + shapeSize[i].height/2 + 5) + ")"; };

      } else if (orient === "horizontal"){
        cellTrans = function(d,i) { return "translate(" + (i * (maxW + shapePadding)) + ",0)"; };
        textTrans = function(d,i) { return "translate(" + (shapeSize[i].width/2  + shapeSize[i].x) + "," +
              (maxH + labelOffset ) + ")"; };
      }

      d3_placement(orient, cell, cellTrans, text, textTrans);
      cell.transition().style("opacity", 1);

    }


  legend.scale = function(_) {
    if (!arguments.length) return legend;
    scale = _;
    return legend;
  };

  legend.cells = function(_) {
    if (!arguments.length) return legend;
    if (_.length > 1 || _ >= 2 ){
      cells = _;
    }
    return legend;
  };

  legend.shapePadding = function(_) {
    if (!arguments.length) return legend;
    shapePadding = +_;
    return legend;
  };

  legend.labels = function(_) {
    if (!arguments.length) return legend;
    labels = _;
    return legend;
  };

  legend.labelFormat = function(_) {
    if (!arguments.length) return legend;
    labelFormat = _;
    return legend;
  };

  legend.labelOffset = function(_) {
    if (!arguments.length) return legend;
    labelOffset = +_;
    return legend;
  };

  legend.orient = function(_){
    if (!arguments.length) return legend;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  };



  return legend;

};
