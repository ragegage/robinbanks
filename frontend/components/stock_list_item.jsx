var React = require('react');
var Sparklines = require('react-sparklines').Sparklines;
var SparklinesLine = require('react-sparklines').SparklinesLine;
var ClientActions = require('./../actions/client_actions'),
    StockPriceStore = require('./../stores/stock_price_store');

var StockListItem = React.createClass({
  getInitialState: function(){
    return {
      price: 10.53
    };
  },

  componentDidMount: function(){
    console.log("listitem didmount");
    this.listener = StockPriceStore.addListener(this.onChange);
    // ClientActions.getCurrentPrice(this.props.item.ticker_symbol);
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  onChange: function(){
    this.setState({price: StockPriceStore.price(this.props.item.ticker_symbol)})
  },

  render: function(){
    debugger;

    if(this.props.item){
      var historicalPriceData = this.props.item.historical_data.map(function(datum){
                                  return datum.close
                                });
    } else {
      var historicalPriceData = [];
    }


    return (
      <div className="stock-list-item" onClick={this.delete}>
        {this.props.item.id}
        {this.props.item.ticker_symbol}
        <Sparklines data={historicalPriceData} limit={30} width={90} height={20} margin={5}>
          <SparklinesLine style={{stroke: "21ce99", fill: "none"}} />
        </Sparklines>
        <button>${this.props.item.price}</button>
      </div>
    );
  },

  delete: function(e){
    e.preventDefault();
    ClientActions.removeListItem(this.props.item.id);
  }
});

module.exports = StockListItem;
