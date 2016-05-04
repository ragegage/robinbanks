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
      currentPrice: 0.00
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

  componentWillUnmount: function(){
    this.hpListener.remove();
    this.lsListener.remove();
  },

  onChangeChart: function(){
    this.setState({
      historicalPriceData: HistoricalPriceStore.data() || 0.00
    });
  },

  onChangeList: function(){
    console.log("stockchart calls currentPriceByTicker");
    this.setState({
      currentPrice: ListStore.currentPriceByTicker(this.props.ticker)
    });
  },

  render: function(){
    if(this.state.historicalPriceData.length > 0)
      var priceChange = this.state.currentPrice - this.state.historicalPriceData[0].close
    else
      var priceChange = 0;

    var chartColor = (priceChange >= 0 ? "#21ce99" : "#fb5229");
    var prices = this.state.historicalPriceData.map(function(datum){return datum.close;});


    var chartData = {
      labels: [],
      datasets: [{
        data: prices,
        strokeColor: chartColor,

        fillColor: "#fff",
        pointColor: chartColor,
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
        pointHitRadius: 10
      }]
    };
    var chartOptions = {
      scaleShowHorizontalLines: false,
      bezierCurveTension: 0,
      pointDot: false,
      pointHitDetectionRadius: 1,
      datasetFill: false,
      responsive: true,
      tooltips: {
        mode: 'single',
        callbacks: {}
      },
      hover: {
          mode: 'dataset'
      }
    };

    var loader = (
      <div className="loader">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );

    var graph = (<LineChart data={chartData} options={chartOptions}
                             width="600" height="300" />);


    return (
      <div className="stock-chart">
        <div className="chart-main-price">
          <h1>${this.state.currentPrice.toFixed(2)}</h1>
        </div>
        <div className="chart-main-details">
          <h4>
            <span className={(priceChange >= 0 ? "good-news" : "bad-news")}>
              {priceChange >= 0 ? "+" : "-"}${Math.abs(priceChange).toFixed(2)}
              &nbsp;
              ({(100*(priceChange/this.state.currentPrice)).toFixed(2)}%)
            </span>
            &nbsp;
            PAST {this.state.view}
          </h4>
        </div>
        <div className="chart-chart">
          {this.state.historicalPriceData.length === 0 ? loader : ""}
          {graph}
        </div>
        <div className="chart-options">
          <h4>
            <a className={this.state.view === "1M" ? "selected" : ""}
              onClick={this.onOptionsClick}>1M</a>&nbsp;
            <a className={this.state.view === "3M" ? "selected" : ""}
              onClick={this.onOptionsClick}>3M</a>&nbsp;
            <a className={this.state.view === "6M" ? "selected" : ""}
              onClick={this.onOptionsClick}>6M</a>&nbsp;
            <a className={this.state.view === "1Y" ? "selected" : ""}
              onClick={this.onOptionsClick}>1Y</a>&nbsp;
          </h4>
        </div>
      </div>
    );
  },

  onOptionsClick(e){
    this.setState({view: e.target.text});
    ClientActions.fetchHistoricalPrices(this.props.ticker, e.target.text);
  }
});

module.exports = StockChart;
