var React = require('react');
var Sparklines = require('react-sparklines').Sparklines;
var SparklinesLine = require('react-sparklines').SparklinesLine;
var ClientActions = require('./../actions/client_actions');

var StockListItem = React.createClass({
  render: function(){
    if(this.props.item){
      var historicalPriceData = this.props.item.historical_data.map(function(datum){
                                  return datum.close
                                });
    } else {
      var historicalPriceData = [];
    }


    return (
      <div className="stock-list-item" onClick={this.select}>
        {this.props.item.ticker_symbol}
        <Sparklines data={historicalPriceData} limit={30} width={90} height={20} margin={5}>
          <SparklinesLine style={{stroke: "21ce99", fill: "none"}} />
        </Sparklines>
        <button>${this.props.item.price}</button>
        <button className="list-item-delete" onClick={this.delete}>Delete</button>
      </div>
    );
  },

  delete: function(e){
    e.preventDefault();
    ClientActions.removeListItem(this.props.item.id);
  },

  select: function(e){
    e.preventDefault();
    // ClientActions.removeListItem(this.props.item.id);
  }
});

module.exports = StockListItem;
