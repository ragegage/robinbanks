var ApiUtil = require('./../util/api_util');

var UserActions = {
  fetchCurrentUser: function(){
    ApiUtil.fetchCurrentUser();
  },

  logout: function(){
    ApiUtil.logout();
  },

  login: function(userData){
    ApiUtil.login(userData);
  },

  signup: function(userData){
    ApiUtil.signup(userData);
  }
};

module.exports = UserActions;
