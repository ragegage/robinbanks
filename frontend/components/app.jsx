var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state'),
    StocksIndex = require('./stocks_index'),
    Nav = require('./nav');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div>
        <Nav userErrors={this.state.userErrors} currentUser={this.state.currentUser} />
        <div className="stock-info">
          <StocksIndex userErrors={this.state.userErrors} currentUser={this.state.currentUser} />
          {this.props.children}
        </div>
        {this.props.location.pathname === "/" ? (<video autoPlay loop id="bgvid">
          <source src="dollars.webm" type="video/webm" />
          <source src="dollars.mp4" type="video/mp4" />
        </video>) : ""}
      </div>
    );
  }
});

module.exports = App;
