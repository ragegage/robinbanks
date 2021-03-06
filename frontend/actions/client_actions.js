var ApiUtil = require('./../util/api_util');

var ClientActions = {
  fetchCurrentList: function(){
    ApiUtil.fetchList();
  },

  createListItem: function(stockId){
    ApiUtil.createListItem(stockId);
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

  getCurrentPrice: function(tickerSymbol){
    ApiUtil.getCurrentPrice(tickerSymbol);
  },

  fetchHistoricalPrices: function(ticker, range){
    ApiUtil.fetchHistoricalPrices(ticker, range);
  },

  fetchRelatedNews: function(ticker){
    ApiUtil.fetchRelatedNews(ticker);
  }
};

module.exports = ClientActions;
