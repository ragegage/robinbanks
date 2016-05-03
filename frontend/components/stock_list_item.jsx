var React = require('react'),
    HashHistory = require('react-router').hashHistory;
var Sparklines = require('react-sparklines').Sparklines;
var SparklinesLine = require('react-sparklines').SparklinesLine;
var ClientActions = require('./../actions/client_actions');

var StockListItem = React.createClass({
  getInitialState: function(){
    return {selected: false};
  },

  render: function(){
    if(this.props.item){
      var historicalPriceData = this.props.item.historical_data.map(function(datum){
                                  return datum.close
                                });
    } else {
      var historicalPriceData = [];
    }

    var sparkLineColor = (this.state.selected ? "ffffff" : "21ce99");

    return (
      <div className={"stock-list-item"+(this.state.selected ? " selected" : "")} onClick={this.select}>
        {this.props.item.ticker_symbol}
        <Sparklines data={historicalPriceData} limit={22} width={90} height={20} margin={5}>
          <SparklinesLine style={{stroke: sparkLineColor, fill: "none"}} />
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
    this.setState({selected: true})
    HashHistory.push(this.props.item.ticker_symbol);
  }
});

module.exports = StockListItem;
