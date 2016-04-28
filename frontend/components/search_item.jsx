var React = require('react');
var ClientActions = require('./../actions/client_actions');

var SearchItem = React.createClass({
  render: function(){
    return (
      <div className="search-result-item" onClick={this.createListItem}>
        {this.props.stock.ticker_symbol}
      </div>
    );
  },

  createListItem: function(e){
    e.preventDefault();
    ClientActions.createListItem(this.props.stock.id);
  }
});

module.exports = SearchItem;
