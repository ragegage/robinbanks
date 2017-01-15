var React = require('react');

var OwnGraph = React.createClass({
  componentWillReceiveProps: function(newProps) {
    console.log("owngraph wrprops");
    console.log(newProps);
    console.log(this.props);
    var ctx = this.refs.canvas.getContext('2d');
    this.drawLines(ctx, newProps);
  },

  render: function(){
    return (
      <canvas onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave} ref="canvas" width={600} height={300}>
      </canvas>
    );
  },

  drawLines: function(ctx, newProps){
    var width = 600;
    var height = 300;
    var data = newProps.data;
    var numPoints = data.length;
    var yMax = Math.max.apply(null, data);
    var yMin = Math.min.apply(null, data);
    var yRange = yMax - yMin;
    var xStep = width / numPoints;
    var color = newProps.color;

    ctx.clearRect(0,0, width, height);
    ctx.beginPath();
    ctx.moveTo((i * xStep), (height - (((data[i] - yMin)/yRange) * height)));
    for (var i = 0; i < data.length - 1; i++) {
      ctx.lineTo(((i + 1) * xStep), (height - (((data[i + 1] - yMin)/yRange) * height)));
    }
    ctx.strokeStyle = color;
    ctx.stroke();

    console.log(data);
  },

  drawReferenceLine: function(ctx, relativeLocation, hoverWidth){
    var lineLocation = Math.floor(relativeLocation / hoverWidth) * hoverWidth;
    // debugger;
    ctx.beginPath();
    ctx.moveTo(lineLocation, 0);
    ctx.lineTo(lineLocation, 300);
    ctx.strokeStyle = "#333333";
    ctx.stroke();
  },

  onMouseMove: function(e){
    e.preventDefault();
    var elLocation = this.refs.canvas.getBoundingClientRect().left;
    var relativeLocation = e.pageX - elLocation;
    var numPoints = this.props.data.length;
    var elWidth = 600;
    var hoverWidth = elWidth / numPoints;

    var ctx = this.refs.canvas.getContext('2d');

    this.drawReferenceLine(ctx, relativeLocation, hoverWidth);
    this.props.onMouseMove(relativeLocation, hoverWidth);
  },

  onMouseLeave: function(e){
    this.props.onMouseLeave(e);
  }
});

module.exports = OwnGraph;
