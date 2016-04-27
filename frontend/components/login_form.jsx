var React = require("react");
var UserActions = require("../actions/user_actions"),
    CurrentUserState = require("../mixins/current_user_state");

var LoginForm = React.createClass({
  render: function(){
    var content;
    if(this.currentUser){
      content = (
        <button onClick={this.logout}>Log Out</button>
      );
    } else {
      content = (
        <button onClick={this.login}>Log In</button>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});

module.exports = LoginForm;
