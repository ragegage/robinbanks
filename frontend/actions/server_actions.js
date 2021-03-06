var Dispatcher = require('./../dispatcher/dispatcher');
var ListConstants = require('./../constants/list_constants'),
    SearchConstants = require('./../constants/search_constants'),
    HistoricalPriceConstants = require('./../constants/historical_price_constants'),
    NewsConstants = require('./../constants/news_constants.js');

var ServerActions = {
  // user server actions
  receiveCurrentUser: function(currentUser){
    if(isEmpty(currentUser))
      Dispatcher.dispatch({
        actionType: "LOGOUT",
        user: currentUser
      });
    else
      Dispatcher.dispatch({
        actionType: "LOGIN",
        user: currentUser
      });
  },

  receiveErrors: function(errors){
    Dispatcher.dispatch({
      actionType: "ERROR",
      errors: JSON.parse(errors.responseText)
    });
  },

  logout: function(formerUser){
    Dispatcher.dispatch({
      actionType: "LOGOUT",
      user: formerUser
    });
  },

  //internal data server actions
  receiveCurrentList: function(newList){
    Dispatcher.dispatch({
      actionType: ListConstants.RECEIVE_NEW_LIST,
      list: newList
    });
  },

  receiveListItem: function(newItem){
    //deprecated
    Dispatcher.dispatch({
      actionType: ListConstants.RECEIVE_NEW_LIST_ITEM,
      item: newItem
    });
  },

  receiveListErrors: function(errors){
    Dispatcher.dispatch({
      actionType: ListConstants.ERROR,
      errors: errors
    });
  },

  receiveSearchResults: function(results){
    Dispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      results: results
    });
  },

  receiveSearchErrors: function(errors){
    Dispatcher.dispatch({
      actionType: SearchConstants.ERROR,
      errors: errors
    });
  },

  //external data server actions
  receiveHistoricalPrices: function(priceData){
    Dispatcher.dispatch({
      actionType: HistoricalPriceConstants.RECEIVE_HISTORICAL_PRICE_RESULTS,
      data: priceData
    });
  },

  receiveHistoricalPriceErrors: function(errors){
    Dispatcher.dispatch({
      actionType: HistoricalPriceConstants.ERROR,
      errors: errors
    });
  },
  
  receiveNews: function(news){
    Dispatcher.dispatch({
      actionType: NewsConstants.RECEIVE_NEWS,
      news: news
    });
  },

  receiveNewsErrors: function(errors){
    Dispatcher.dispatch({
      actionType: NewsConstants.ERROR,
      errors: errors
    });
  }
};

module.exports = ServerActions;

var isEmpty = function(obj){
  return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
};
