var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    ListStore = require('./../stores/list_store'),
    CurrentUserState = require('./../mixins/current_user_state'),
    StockListItem = require('./stock_list_item'),
    Search = require('./search');

var StocksIndex = React.createClass({
  getInitialState: function(){
    return {
      list: ListStore.list(),
      listErrors: ListStore.listErrors()
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
  },

  render: function(){
    var list = "";

    if(this.props.currentUser && this.state.list)
      list =  this.state.list.map(function(item){
                return <StockListItem item={item} />
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
  }
});

module.exports = StocksIndex;
