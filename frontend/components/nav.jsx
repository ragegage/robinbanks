var React = require('react');
var LoginForm = require('./login_form');

var Nav = React.createClass({
  render: function(){
    return (
      <nav className="nav">
        <LoginForm userErrors={this.props.userErrors} currentUser={this.props.currentUser} />
      </nav>
    );
  }
});

module.exports = Nav;
