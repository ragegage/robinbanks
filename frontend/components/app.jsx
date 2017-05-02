var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state'),
    StocksIndex = require('./stocks_index'),
    Nav = require('./nav'),
    Splash = require('./splash');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div className="react-content">
        <Nav userErrors={this.state.userErrors} currentUser={this.state.currentUser} />
        {this.state.listErrors ? this.state.listErrors : (
        <div className="stock-info">
          {this.props.children}
          <StocksIndex userErrors={this.state.userErrors} currentUser={this.state.currentUser} />
        </div>)}
        {this.state.currentUser ? "" : (
        <Splash />)}
      </div>
    );
  }
});

module.exports = App;
