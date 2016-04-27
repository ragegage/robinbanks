var React = require('react');
var CurrentUserState = require('./../mixins/current_user_state'),
    Nav = require('./nav');

var App = React.createClass({
  mixins: [CurrentUserState],

  render: function(){
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
