

 var React = require('react');

 var StockNewsItem = React.createClass({
   render: function(){
     return (
       <li className="news-result-item">
         <a href={this.props.item.url} target="_blank">{this.props.item.title}</a>
         <h4>{this.props.item.date}</h4>
       </li>
     );
   }
 });

 module.exports = StockNewsItem;
