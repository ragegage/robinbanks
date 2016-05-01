var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    NewsStore = require('./../stores/news_store');

var StockNews = React.createClass({
  getInitialState: function(){
    return {
      news: []
    };
  },

  componentDidMount: function(){
    NewsStore.addListener(this.onChange);
    ClientActions.fetchRelatedNews(this.props.ticker);
  },

  componentDidReceiveProps: function(){
    NewsStore.addListener(this.onChange);
    ClientActions.fetchRelatedNews(this.props.ticker);
  },

  onChange: function(){
    this.setState({news: NewsStore.news()});
  },

  render: function(){
    var newsItems = (
      this.state.news.map(function(item){
        return <li className="news-result-item">{item.title}</li>;
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
