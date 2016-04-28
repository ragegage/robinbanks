var Dispatcher = require('./../dispatcher/dispatcher');
var ListConstants = require('./../constants/list_constants'),
    SearchConstants = require('./../constants/search_constants');

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
  }

  //external data server actions
};

module.exports = ServerActions;

var isEmpty = function(obj){
  return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
};
