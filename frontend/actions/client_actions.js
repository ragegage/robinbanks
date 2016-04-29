var ApiUtil = require('./../util/api_util');

var ClientActions = {
  fetchCurrentList: function(){
    console.log("clientactions.fetchlist");
    ApiUtil.fetchList();
  },

  createListItem: function(stock_id){
    ApiUtil.createListItem(stock_id);
  },

  updateListItem: function(id, newSiblingId){
    ApiUtil.updateListItem(id, newSiblingId);
  },

  removeListItem: function(id){
    ApiUtil.removeListItem(id);
  },

  queryStocks: function(query){
    ApiUtil.getMatchingStocks(query);
  },

  getCurrentPrice: function(ticker_symbol){
    ApiUtil.getCurrentPrice(ticker_symbol);
  }
};

module.exports = ClientActions;
