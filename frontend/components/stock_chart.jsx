var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    HistoricalPriceStore = require('./../stores/historical_price_store');

var StockChart = React.createClass({
  render: function(){
    return (
      <div className="stock-chart">
        <div className="chart-main-price"><h1>$227.65</h1></div>
        <div className="chart-main-details"><h4>+$6.00 (5%) PAST 3M</h4></div>
        <div className="chart-chart"></div>
        <div className="chart-options"><h4>1D 1M 3M 6M 1Y ALL</h4></div>
      </div>
    );
  }
});

module.exports = StockChart;
