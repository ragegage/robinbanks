var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    StockStore = require('./../stores/stock_store'),
    SearchItem = require('./search_item');

var Search = React.createClass({
  getInitialState: function(){
    return {
      results: [],
      query: ""
    };
  },

  // componentDidMount: function(){
  //   this.listener = StockStore.addListener(this.onChange);
  //   ClientActions.queryStocks(this.state.query);
  // },
  //
  // componentWillUnmount: function(){
  //   this.listener.remove();
  // },

  onFocus: function(){
    this.listener = StockStore.addListener(this.onChange);
    ClientActions.queryStocks(this.state.query);
  },

  onBlur: function(){
    var self = this;
    setTimeout(function(){
      if(self.listener)
        self.listener.remove();
      self.setState({
        results: [],
        query: ""
      });
    }, 200);
  },

  onChange: function(){
    this.setState({results: StockStore.list()});
  },

  render: function(){
    var results = "";
    if(this.state.results.length > 0){
      results = (
        <ul>
          {this.state.results.map(function(stock){
            return <SearchItem stock={stock} />;
          })}
        </ul>
      );
    }

    return (
      <div className="search">
        <input type="text"
          value={this.state.query}
          onChange={this.queryChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder="Find a Stock..."/>
        {results}
      </div>
    );
  },

  queryChange: function(e){
    e.preventDefault();
    this.setState({query: e.target.value});
    ClientActions.queryStocks(e.target.value);
  }
});

module.exports = Search;
