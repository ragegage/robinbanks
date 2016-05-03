var React = require('react');
var LineChart = require('react-chartjs').Line;
var ClientActions = require('./../actions/client_actions'),
    HistoricalPriceStore = require('./../stores/historical_price_store'),
    ListStore = require('./../stores/list_store');

var StockChart = React.createClass({
  getInitialState: function(){
    return {
      view: "1M",
      historicalPriceData: [],
      currentPrice: 227.65
    };
  },

  componentDidMount: function(){
    this.hpListener = HistoricalPriceStore.addListener(this.onChangeChart);
    this.lsListener = ListStore.addListener(this.onChangeList);
    ClientActions.fetchHistoricalPrices(this.props.ticker, this.state.view);
  },

  componentWillReceiveProps: function(newProps){
    if(!this.hpListener)
      HistoricalPriceStore.addListener(this.onChangeChart);
    if(!this.lsListener)
      this.lsListener = ListStore.addListener(this.onChangeList);
    ClientActions.fetchHistoricalPrices(newProps.ticker, this.state.view);
    this.onChangeList();
  },

  onChangeChart: function(){
    this.setState({
      historicalPriceData: HistoricalPriceStore.data() || 227.65
    });
  },

  onChangeList: function(){
    console.log("stockchart calls currentPriceByTicker");
    this.setState({
      currentPrice: ListStore.currentPriceByTicker(this.props.ticker)
    });
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

    if(this.state.historicalPriceData.length > 0)
      var priceChange = this.state.currentPrice - this.state.historicalPriceData[0].close
    else
      var priceChange = 0;

    return (
      <div className="stock-chart">
        <div className="chart-main-price">
          <h1>${this.state.currentPrice}</h1>
        </div>
        <div className="chart-main-details">
          <h4>
            {priceChange > 0 ? "+" : "-"}${priceChange.toFixed(2)}
            ({(100*(priceChange/this.state.currentPrice)).toFixed(2)}%)
            PAST {this.state.view}
          </h4>
        </div>
        <div className="chart-chart">{graph}</div>
        <div className="chart-options">
          <h4>1M 3M 6M 1Y ALL</h4>
        </div>
      </div>
    );
  },

  onOptionsClick(e){
    this.setState({view: e.target.text});
  }
});

module.exports = StockChart;
