var React = require('react');
var ClientActions = require('./../actions/client_actions'),
    NewsStore = require('./../stores/news_store'),
    StockNewsItem = require('./stock_news_item');

var StockNews = React.createClass({
  getInitialState: function(){
    return {
      news: []
    };
  },

  componentDidMount: function(){
    this.listener = NewsStore.addListener(this.onChange);
    ClientActions.fetchRelatedNews(this.props.ticker);
  },

  componentWillReceiveProps: function(){
    if(!this.listener)
      NewsStore.addListener(this.onChange);
    ClientActions.fetchRelatedNews(this.props.ticker);
  },

  onChange: function(){
    this.setState({news: NewsStore.news()});
  },

  render: function(){
    var newsItems = (
      this.state.news.map(function(item, idx){
        return <StockNewsItem item={item} key={idx}/>;
      })
    );

    var loader = (
      <div className="loader">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );

    if(newsItems.length === 0)
      var newsItems = loader;


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
