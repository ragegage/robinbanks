var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div>main app</div>
    );
  }
});

module.exports = App;
