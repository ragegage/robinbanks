var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    StockStore = require('./../stores/stock_store');

var StockShow = React.createClass({
  componentDidMount: function(){
    this.stock = StockStore.find(this.props.params.id);
  },

  render: function(){
    return (
      <div classname="stock-detail">
      </div>
    );
  }
});

module.exports = StockShow;
