var React = require('react'),
    Modal = require('react-modal'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require('../actions/user_actions'),
    CurrentUserState = require('../mixins/current_user_state');

var StocksIndex = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  render: function(){
    return 'stocksindex';
  }
});

module.exports = StocksIndex;
