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

    return (
      <div className="stock-list">
        {this.props.currentUser ? <Search /> : ""}
        <ul onDragOver={this.dragOver}>
          {list}
        </ul>
      </div>
    );
  },

  changeSelected: function(ticker_symbol){
    console.log("changeSelected runs");
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
  },


  handleSort: function(e){
    console.log("SORT SORT SORT");
    debugger;
  }

  // drag: function(e){
  //   e.preventDefault();
  //   console.log("drag drag drag");
  // },
  //
  // dragStart: function(e){
  //   console.log("dragstart");
  //   this.dragged = e.currentTarget;
  //   e.dataTransfer.effectAllowed = 'move';
  //
  //   e.dataTransfer.setData("text/html", e.currentTarget);
  // },
  // dragEnd: function(e){
  //   console.log("dragend");
  //   this.dragged.style.display = "block";
  //   this.dragged.parentNode.removeChild(placeholder);
  //
  //   var from = Number(this.dragged.dataset.id);
  //   var to = Number(this.over.dataset.id);
  //   debugger;
  // },
  // dragOver: function(e){
  //   console.log("dragover");
  //   e.preventDefault();
  //   this.dragged.style.display = "none";
  //   if(e.target.className == "placeholder") return;
  //   this.over = e.target;
  //   e.target.parentNode.insertBefore(placeholder, e.target);
  // }
});

module.exports = StocksIndex;
