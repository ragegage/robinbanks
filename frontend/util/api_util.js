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
    console.log("apiutil.fetchlist");
    $.ajax({
      method: 'GET',
      url: 'api/list',
      data: {},
      success: function(currentList){
        console.log("apiutil.fetchlist success");
        ServerActions.receiveCurrentList(currentList);
      },
      error: function(errors){
        console.log("apiutil.fetchlist error");
        ServerActions.receiveListErrors(errors);
      }
    });
  },

  createListItem: function(stock_id){
    $.ajax({
      method: 'POST',
      url: 'api/stock_list_items',
      data: {stock_list_item: {stock_id: stock_id}},
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
  getCurrentPrice: function(ticker){


    // $.ajax({
    //   method: 'GET',
    //   url: 'https://finance.yahoo.com/webservice/v1/symbols/'+ticker+'/quote?format=json',
    //   data: {},
    //   success: function(priceInfo){
    //     if(priceInfo.list.meta.count > 0){ // success
    //       var priceData = priceInfo.list.resources[0].resource.fields;
    //       ServerActions.receiveCurrentPrice(priceData);
    //     } else { //silent failure
    //       ServerActions.receiveCurrentPriceErrors(["no results found for "+ticker]);
    //     }
    //   },
    //   error: function(errors){ // loud failure
    //     ServerActions.receiveCurrentPriceErrors(errors);
    //   }
    // });
  },

  getHistoricalPrices: function(ticker, dateRange){
    // dateRange = {start: "2016-03-24", end: "2016-04-24"}
    $.ajax({
      method: 'GET',
      url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%20%22'+ticker+'%22%20and%20startDate%20%3D%20%22'+dateRange.start+'%22%20and%20%20endDate%20%3D%20%22'+dateRange.end+'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
      data: {},
      success: function(data){
        if(data.query.count > 0){ // success
          var priceData = data.query.results.quote;
          ServerActions.receiveHistoricalPrices(priceData);
        } else { //silent failure
          ServerActions.receiveHistoricalPriceErrors(["no results found for "+ticker]);
        }
      },
      error: function(errors){ // loud failure
        ServerActions.receiveHistoricalPriceErrors(errors);
      }
    });
  },

  getRelatedNews: function(ticker){
    // not implemented yet

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
