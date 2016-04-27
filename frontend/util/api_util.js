var ServerActions = require('./../actions/server_actions');

var ApiUtil = {
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
  }
};

module.exports = ApiUtil;
