var React = require('react');
var LoginForm = require('./login_form');

var Nav = React.createClass({
  render: function(){
    return (
      <nav className="nav">
        <LoginForm />
      </nav>
    );
  }
});

module.exports = Nav;
