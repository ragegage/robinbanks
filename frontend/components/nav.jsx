var React = require('react'),
    HashHistory = require('react-router').hashHistory;
var LoginForm = require('./login_form');

var Nav = React.createClass({
  render: function(){
    return (
      <nav className="nav">
        <div className="logo" onClick={this.logoClick}></div>
        <LoginForm userErrors={this.props.userErrors} currentUser={this.props.currentUser} />
      </nav>
    );
  },

  logoClick: function(e){
    e.preventDefault();
    HashHistory.push("/");
  }
});

module.exports = Nav;
