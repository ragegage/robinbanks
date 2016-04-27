var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state'),
    LoginForm = require('./login_form');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div>
        this is my app
        <br/>
        bitches
        <LoginForm />
      </div>
    );
  }
});

module.exports = App;
