var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    ListStore = require('./../stores/stock_store'),
    StockChart = require('./stock_chart'),
    StockNews = require('./stock_news');

var StockShow = React.createClass({
  getInitialState: function(){
    return {stock: {}};
  },

  componentDidMount: function(){
    ListStore.addListener(this.onChange);
  },

  onChange: function(){
    this.setState({stock: ListStore.find(this.props.params.id)});
  },

  render: function(){
    return (
      <div className="stock-detail">
        <StockChart ticker={this.state.stock.ticker_symbol}/>
        <StockNews ticker={this.state.stock.ticker_symbol}/>
      </div>
    );
  }
});

module.exports = StockShow;
