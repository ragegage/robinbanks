var React = require('react');
var StockChart = require('./stock_chart'),
    StockNews = require('./stock_news');

var StockShow = React.createClass({
  render: function(){
    return (
      <div className="stock-detail">
        <StockChart ticker={this.props.params.tickerSymbol}/>
        <StockNews ticker={this.props.params.tickerSymbol}/>
      </div>
    );
  }
});

module.exports = StockShow;
