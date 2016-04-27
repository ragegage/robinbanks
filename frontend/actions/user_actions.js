var ApiUtil = require('./../util/api_util');

var UserActions = {
  fetchCurrentUser: function(){
    ApiUtil.fetchCurrentUser();
  }
};

module.exports = UserActions;
