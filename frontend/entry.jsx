var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    HashHistory = require('react-router').hashHistory,
    Modal = require('react-modal');
var App = require('./components/app'),
    StockShow = require('./components/stock_show');

var routes = (
  <Route path="/" component={App}>
    <Route path=":tickerSymbol" component={StockShow}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(<Router history={HashHistory}>{routes}</Router>,
                  document.getElementById("content"));
});
