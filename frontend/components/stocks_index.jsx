var React = require('react'),
    Modal = require('react-modal'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
var ClientActions = require('./../actions/client_actions'),
    ListStore = require('./../stores/list_store'),
    CurrentUserState = require('./../mixins/current_user_state'),
    StockListItem = require('./stock_list_item'),
    Search = require('./search');

var StocksIndex = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  getInitialState: function(){
    return {
      list: ListStore.list()
    };
  },

  componentDidMount: function(){
    ListStore.addListener(this.onChange);
    ClientActions.fetchCurrentList();
  },

  componentDidReceiveProps: function(){
    ListStore.addListener(this.onChange);
    ClientActions.fetchCurrentList();
  },

  onChange: function(){
    this.setState({list: ListStore.list()});
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
        <Search />
        'stocksindex'
        <ul>
          {list}
        </ul>
      </div>
    );
  }
});

module.exports = StocksIndex;
