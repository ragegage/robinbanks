var React = require('react');
// DOMElement findDOMNode(ReactComponent component)

var LineChart = React.createClass({
  getInitialState: function(){
    return {state: "existing"};
  },

  	// Prep the graph after render()
  componentDidMount: function () {

	  var el = this.findDOMNode(this);
		var data = this.props.data;
		var self = this;

		// Create a new graph
		this.graph = new Rickshaw.Graph({
			element: el,
			series : [
				{
					color: this.props.colour,
					data : data
				}
			]
		});

		// Create x time axis labels
		var axes = new Rickshaw.Graph.Axis.Time({ graph: this.graph });

		// Render the graph
		this.graph.render();

		// Faux-responsive chart
		$(window).on('resize', function(){
			self.updateChartDimensions();
		});

	},

  render: function () {

		// Update the graph
		if (this.graph){
			this.graph.render();
		}

		// Nought to return, cos Rickshaw interacts directly with the dom node
		return React.DOM.div(null, '');

	}
});

  module.exports = LineChart;
