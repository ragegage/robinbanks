var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div>
        this is my app
        <br/>
        bitches
      </div>
    );
  }
});

module.exports = App;
