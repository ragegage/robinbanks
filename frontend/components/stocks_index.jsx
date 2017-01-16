var React = require('react'),
    HashHistory = require('react-router').hashHistory;
// var SortableList = require('./../mixins/rubaxa_sortable');
var ClientActions = require('./../actions/client_actions'),
    ListStore = require('./../stores/list_store'),
    CurrentUserState = require('./../mixins/current_user_state'),
    StockListItem = require('./stock_list_item'),
    Search = require('./search');

var StocksIndex = React.createClass({
  // mixins: [SortableList],

  getInitialState: function(){
    return {
      list: ListStore.list(),
      listErrors: ListStore.listErrors(),
      selected: null,
      loading: true
    };
  },

  componentDidMount: function(){
    this.listener = ListStore.addListener(this.onChange);
    // if(this.state.currentUser && (!this.state.list || this.state.currentUser.id !== this.state.list.user_id))
    //   ClientActions.fetchCurrentList();
    // ClientActions.fetchCurrentList();
  },

  // componentWillReceiveProps: function(){
  //   this.listener = ListStore.addListener(this.onChange);
  //   ClientActions.fetchCurrentList();
  // },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  onChange: function(){
    this.setState({
      list: ListStore.list(),
      listErrors: ListStore.listErrors(),
      loading: false
    });
    this.changeSelected();
  },

  render: function(){
    var self = this;

    var list = "";

    if(this.props.currentUser && this.state.list)
      list =  this.state.list.map(function(item, idx){
                return <StockListItem item={item}
                          key={idx}
                          selected={self.state.selected === item.ticker_symbol}
                          onSelect={self.changeSelected}
                          />
              });

    var placeholder = document.createElement("li");
    placeholder.className = "placeholder";
    // if(this.state.listErrors)
    //   list = this.state.listErrors;
    if(this.state.listErrors)
      if(this.state.listErrors[0] === "Stock has already been taken")
        alert("You are already watching that stock!");

    var loader = (this.props.currentUser ?
      (<div className="loader">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>)
      :
      "");


    return (
      <div className="stock-list">
        {this.props.currentUser ? <Search /> : ""}
        <ul>
          {this.state.loading ? loader : ""}
          {list}
        </ul>
      </div>
    );
  },

  changeSelected: function(ticker_symbol){
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
