var React = require('react');
var LineChart = require('react-chartjs').Line;
var ClientActions = require('./../actions/client_actions'),
    HistoricalPriceStore = require('./../stores/historical_price_store');

var StockChart = React.createClass({
  getInitialState: function(){
    return {
      view: "1M",
      historicalPriceData: []
    };
  },

  componentDidMount: function(){
    this.listener = HistoricalPriceStore.addListener(this.onChange);
    ClientActions.fetchHistoricalPrices(this.props.ticker, this.state.view);
  },

  componentWillReceiveProps: function(newProps){
    if(!this.listener)
      HistoricalPriceStore.addListener(this.onChange);
    ClientActions.fetchHistoricalPrices(newProps.ticker, this.state.view);
  },

  onChange: function(){
    this.setState({historicalPriceData: HistoricalPriceStore.data()});
  },

  render: function(){
    var prices = this.state.historicalPriceData.map(function(datum){return datum.close;});
    var chartOptions = {
      labels: this.state.historicalPriceData.map(function(datum){return datum.date;}),
      borderColor: "#21ce99",
      label: ""
    };


    var chartData = {
      labels: [],
      datasets: [{
        data: prices,
        fillColor: "#fff",
        strokeColor: "#21ce99",
        pointColor: "#21ce99",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",

        lineTension: 0,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
    };
    var chartOptions = {
      responsive: true,
      tooltips: {
        mode: 'single',
        callbacks: {
          // beforeTitle: function() {
          //     return '...beforeTitle';
          // },
          // afterTitle: function() {
          //     return '...afterTitle';
          // },
          // beforeBody: function() {
          //     return '...beforeBody';
          // },
          // afterBody: function() {
          //     return '...afterBody';
          // },
          // beforeFooter: function() {
          //     return '...beforeFooter';
          // },
          // footer: function() {
          //     return 'Footer';
          // },
          // afterFooter: function() {
          //     return '...afterFooter';
          // },
        }
      },
      hover: {
          mode: 'dataset'
      }
    };


    var graph = (<LineChart data={chartData} options={chartOptions} width="600" height="300"/>);


    return (
      <div className="stock-chart">
        <div className="chart-main-price"><h1>$227.65</h1></div>
        <div className="chart-main-details"><h4>+$6.00 (5%) PAST 3M</h4></div>
        <div className="chart-chart">{graph}</div>
        <div className="chart-options"><h4>1M 3M 6M 1Y ALL</h4></div>
      </div>
    );
  },

  onOptionsClick(e){
    this.setState({view: e.target.text});
  }
});

module.exports = StockChart;
