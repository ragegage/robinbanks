var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    HashHistory = require('react-router').hashHistory;
var App = require('./components/app');
var CurrentUserState = require('./mixins/current_user_state');

var routes = (
  <Route path="/" component={App}>
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router>{routes}</Router>,
                  document.getElementById("content"));
});
