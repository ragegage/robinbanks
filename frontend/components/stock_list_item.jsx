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
    console.log("item didmount");
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
    return (
      <div className="stock-list-item" onClick={this.delete}>
        {this.props.item.id}
        {this.props.item.ticker_symbol}
        ~~~~~~
        <button>${this.state.price}</button>
      </div>
    );
  },

  delete: function(e){
    e.preventDefault();
    ClientActions.removeListItem(this.props.item.id);
  }
});

module.exports = StockListItem;
