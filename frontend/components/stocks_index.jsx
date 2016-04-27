var React = require('react'),
    Modal = require('react-modal'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require('./../actions/user_actions'),
    ListStore = require('./../stores/list_store'),
    CurrentUserState = require('./../mixins/current_user_state');

var StocksIndex = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  getInitialState: function(){
    return {
      list: ListStore.list()
    };
  },

  render: function(){
    var list = "";

    if(this.state.list)
      list =  this.state.list.map(function(item){
                <li>{item.ticker_symbol}</li>
              });
              
    return (
      <div>
        'stocksindex'
        <ul>
          {list}
        </ul>
      </div>
    );
  }
});

module.exports = StocksIndex;
