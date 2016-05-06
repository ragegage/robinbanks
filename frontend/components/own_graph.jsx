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
      <canvas onMouseMove={this.onMouseMove} ref="canvas" width={600} height={300}>
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
      ctx.strokeStyle = color;
      ctx.stroke();
    }

    console.log(data);
  },

  onMouseMove: function(e){
    this.props.onMouseMove(e, this.refs.canvas);
  }
});

module.exports = OwnGraph;
