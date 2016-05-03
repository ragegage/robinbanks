var React = require('react'),
    HashHistory = require('react-router').hashHistory;
var ClientActions = require('./../actions/client_actions'),
    ListStore = require('./../stores/list_store'),
    CurrentUserState = require('./../mixins/current_user_state'),
    StockListItem = require('./stock_list_item'),
    Search = require('./search');

var StocksIndex = React.createClass({
  getInitialState: function(){
    return {
      list: ListStore.list(),
      listErrors: ListStore.listErrors(),
      selected: null
    };
  },

  componentDidMount: function(){
    console.log("stocksindex didmount");
    this.listener = ListStore.addListener(this.onChange);
    // if(this.state.currentUser && (!this.state.list || this.state.currentUser.id !== this.state.list.user_id))
    //   ClientActions.fetchCurrentList();
    // ClientActions.fetchCurrentList();
  },

  // componentWillReceiveProps: function(){
  //   console.log("stocksindex didreceiveprops");
  //   this.listener = ListStore.addListener(this.onChange);
  //   ClientActions.fetchCurrentList();
  // },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  onChange: function(){
    console.log("stocksindex onchange fires "+ListStore.list());
    this.setState({
      list: ListStore.list(),
      listErrors: ListStore.listErrors()
    });
    this.changeSelected();
  },

  render: function(){
    var self = this;

    var list = "";
    var count = 0;

    if(this.props.currentUser && this.state.list)
      list =  this.state.list.map(function(item){
                count++;
                return <StockListItem item={item}
                          key={count}
                          selected={self.state.selected === item.ticker_symbol}
                          onSelect={self.changeSelected}/>
              });

    // if(this.state.listErrors)
    //   list = this.state.listErrors;

    return (
      <div className="stock-list">
        {this.props.currentUser ? <Search /> : ""}
        <ul>
          {list}
        </ul>
      </div>
    );
  },

  changeSelected: function(ticker_symbol){
    console.log("changeSelected runs");
    debugger;
    if(this.state.list && this.state.list.length === 0){
      this.setState({selected: null});
      HashHistory.push("/");
    } else {
      var potentialTickerSymbol = (this.state.list ? this.state.list[0].ticker_symbol : "");
      ticker_symbol = ticker_symbol || potentialTickerSymbol
      this.setState({selected: ticker_symbol});
      if(ticker_symbol)
        HashHistory.push(ticker_symbol);
    }
  }
});

module.exports = StocksIndex;
