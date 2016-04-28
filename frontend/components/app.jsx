var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state'),
    StocksIndex = require('./stocks_index'),
    Nav = require('./nav');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div>
        <Nav/>
        <div className="stock-info">
          <StocksIndex />
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
