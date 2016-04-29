var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    NewsStore = require('./../stores/news_store');

var StockNews = React.createClass({
  render: function(){
    var newsItems = (
      [1,2,3].map(function(item){
        return <li className="news-result-item">item</li>;
      })
    );


    return (
      <div className="stock-news">
        <h2>Related News</h2>
        <ul>
          {newsItems}
        </ul>
      </div>
    );
  }
});

module.exports = StockNews;
