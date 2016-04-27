var React = require('react'),
    Modal = require('react-modal'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
var ClientActions = require('./../actions/client_actions'),
    ListStore = require('./../stores/list_store'),
    CurrentUserState = require('./../mixins/current_user_state'),
    StockListItem = require('./stock_list_item');

var StocksIndex = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  getInitialState: function(){
    return {
      list: ListStore.list()
    };
  },

  componentDidMount: function(){
    console.log("index didmount");
    ListStore.addListener(this.onChange);
    ClientActions.fetchCurrentList();
  },

  componentDidReceiveProps: function(){
    console.log("index didreceiveprops");
    ListStore.addListener(this.onChange);
    ClientActions.fetchCurrentList();
  },

  onChange: function(){
    console.log("index onchange");
    this.setState({list: ListStore.list()})
  },

  render: function(){
    var list = "";

    if(this.state.list){
      list =  this.state.list.map(function(item){
                return <StockListItem item={item} />
              });
          }

    return (
      <div className="stock-list">
        'stocksindex'
        <ul>
          {list}
        </ul>
      </div>
    );
  }
});

module.exports = StocksIndex;
