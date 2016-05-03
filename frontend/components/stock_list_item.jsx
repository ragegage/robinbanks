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

    var priceWentUp = (this.props.item.price - this.props.item.historical_data[0].close) >= 0;

    var sparkLineColor = (priceWentUp ? "21ce99" : "fb5229")
    sparkLineColor = (this.state.selected ? "ffffff" : sparkLineColor);

    return (
      <div className={"stock-list-item"+(this.props.selected ? " selected" : "")} onClick={this.select}>
        {this.props.item.ticker_symbol}
        <Sparklines data={historicalPriceData} limit={22} width={90} height={20} margin={5}>
          <SparklinesLine style={{stroke: sparkLineColor, fill: "none"}} />
        </Sparklines>
        <button className={priceWentUp ? "" : "bad-news"}>${this.props.item.price.toFixed(2)}</button>
        <button className="list-item-delete" onClick={this.delete}>Delete</button>
      </div>
    );
  },

  delete: function(e){
    console.log("stocklistitem delete called");
    e.preventDefault();
    ClientActions.removeListItem(this.props.item.id);
  },

  select: function(e){
    console.log("stocklistitem select called");
    e.preventDefault();
    this.props.onSelect(this.props.item.ticker_symbol)
  }
});

module.exports = StockListItem;
