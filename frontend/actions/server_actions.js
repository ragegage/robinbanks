var Dispatcher = require('./../dispatcher/dispatcher');

var ServerActions = {
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
  }
};

module.exports = ServerActions;

var isEmpty = function(obj){
  return (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({}));
};
