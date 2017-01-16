var ServerActions = require('./../actions/server_actions');

var ApiUtil = {
  // user utils
  fetchCurrentUser: function(){
    $.ajax({
      method: 'GET',
      url: 'api/user',
      success: function(currentUser){
        ServerActions.receiveCurrentUser(currentUser);
      },
      error: function(errors){
        ServerActions.receiveErrors(errors);
      }
    });
  },

  logout: function(){
    $.ajax({
      method: 'DELETE',
      url: 'api/session',
      success: function(formerUser){
        ServerActions.logout(formerUser);
      },
      error: function(errors){
        ServerActions.receiveErrors(errors);
      }
    });
  },

  login: function(userData){
    $.ajax({
      method: 'POST',
      url: 'api/session',
      data: {user: userData},
      success: function(currentUser){
        ServerActions.receiveCurrentUser(currentUser);
      },
      error: function(errors){
        ServerActions.receiveErrors(errors);
      }
    });
  },

  signup: function(userData){
    $.ajax({
      method: 'POST',
      url: 'api/user',
      data: {user: userData},
      success: function(currentUser){
        ServerActions.receiveCurrentUser(currentUser);
      },
      error: function(errors){
        ServerActions.receiveErrors(errors);
      }
    });
  },

  // internal data utils
  fetchList: function(){
    $.ajax({
      method: 'GET',
      url: 'api/list',
      data: {},
      success: function(currentList){
        ServerActions.receiveCurrentList(currentList);
      },
      error: function(errors){
        ServerActions.receiveListErrors(errors);
      }
    });
  },

  createListItem: function(stockId){
    $.ajax({
      method: 'POST',
      url: 'api/stock_list_items',
      data: {stock_list_item: {stock_id: stockId}},
      success: function(currentList){
        ServerActions.receiveCurrentList(currentList);
      },
      error: function(errors){
        ServerActions.receiveListErrors(errors);
      }
    });
  },

  updateListItem: function(id, newSiblingId){
    $.ajax({
      method: 'PATCH',
      url: 'api/stock_list_items/'+id,
      data: {before_id: newSiblingId},
      success: function(currentList){
        ServerActions.receiveCurrentList(currentList);
      },
      error: function(errors){
        ServerActions.receiveListErrors(errors);
      }
    });
  },

  removeListItem: function(id){
    $.ajax({
      method: 'DELETE',
      url: 'api/stock_list_items/'+id,
      data: {},
      success: function(currentList){
        ServerActions.receiveCurrentList(currentList);
      },
      error: function(errors){
        ServerActions.receiveListErrors(errors);
      }
    });
  },

  getMatchingStocks: function(query){
    $.ajax({
      method: 'GET',
      url: 'api/stocks',
      data: {search: query},
      success: function(matchingStocks){
        ServerActions.receiveSearchResults(matchingStocks);
      },
      error: function(errors){
        ServerActions.receiveSearchErrors(errors);
      }
    });
  },


  // external data utils
  fetchHistoricalPrices: function(ticker, range){
    // range in ["1M", "3M", "6M", "1Y"]
    $.ajax({
      method: 'GET',
      url: 'api/historical_price_data',
      data: {ticker: ticker, range: range},
      success: function(priceData){
        ServerActions.receiveHistoricalPrices(priceData);
      },
      error: function(errors){
        ServerActions.receiveHistoricalPriceErrors(errors);
      }
    });
  },

  fetchRelatedNews: function(ticker){
    // not implemented yet

    $.ajax({
      method: 'GET',
      url: 'api/news',
      data: {ticker: ticker},
      success: function(news){
        ServerActions.receiveNews(news);
      },
      error: function(errors){
        ServerActions.receiveNewsErrors(errors);
      }
    });

    // $.ajax({
    //   method: 'GET',
    //   url: 'https://finance.yahoo.com/rss/industry?s=YHOO',
    //   data: {},
    //   success: function(data){
    //     if(data.query.count > 0){ // success
    //       var priceData = data.query.results.quote;
    //       ServerActions.receiveHistoricalPrices(priceData);
    //     } else { //silent failure
    //       ServerActions.receiveHistoricalPriceErrors(["no results found for "+ticker]);
    //     }
    //   },
    //   error: function(errors){ // loud failure
    //     ServerActions.receiveHistoricalPriceErrors(errors);
    //   }
    // });
  }
};

module.exports = ApiUtil;
