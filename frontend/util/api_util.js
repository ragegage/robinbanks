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
    console.log("apiutil "+query);
    $.ajax({
      method: 'GET',
      url: 'api/stocks',
      data: {search: query},
      success: function(matchingStocks){
        console.log("apiutil success "+matchingStocks);
        ServerActions.receiveSearchResults(matchingStocks);
      },
      error: function(errors){
        console.log("apiutil error "+errors);
        ServerActions.receiveSearchErrors(errors);
      }
    });
  }


  // external data utils

};

module.exports = ApiUtil;
