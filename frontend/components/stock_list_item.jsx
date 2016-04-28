var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    StockPriceStore = require('./../stores/stock_price_store');

var StockListItem = React.createClass({
  getInitialState: function(){
    return {
      price: 10.53
    };
  },

  componentDidMount: function(){
    StockPriceStore.addListener(this.onChange);
    // ClientActions.fetchCurrentPrice(this.props.item.ticker_symbol);
  },

  onChange: function(){
    this.setState({price: StockPriceStore.price(this.props.item.ticker_symbol)})
  },

  render: function(){
    return (
      <div className="stock-list-item">
        {this.props.item.id}
        {this.props.item.ticker_symbol}
        ~~~~~~
        <button>${this.state.price}</button>
      </div>
    );
  }
});

module.exports = StockListItem;
