var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    StockStore = require('./../stores/stock_store');

var Search = React.createClass({
  getInitialState: function(){
    return {
      results: [],
      query: ""
    };
  },

  componentDidMount: function(){
    StockStore.addListener(this.onChange);
    ClientActions.queryStocks(this.state.query);
  },

  onChange: function(){
    this.setState({results: StockStore.list()});
  },

  render: function(){
    results = "";
    if(this.state.results !== []){
      results = (
        <ul>
          {this.state.results.map(function(stock){
            return <li>{stock.ticker_symbol}</li>;
          })}
        </ul>
      );
    }

    return (
      <div className="search">
        <input type="text" value={this.state.query} onChange={this.queryChange} />
        {results}
      </div>
    );
  },

  queryChange: function(e){
    console.log("queryChange "+e.target.value);
    e.preventDefault();
    this.setState({query: e.target.value});
    ClientActions.queryStocks(this.state.query);
  }
});

module.exports = Search;
