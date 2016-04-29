var Dispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var SessionStore = new Store(Dispatcher);

var _currentUser, _errors;

SessionStore.currentUser = function(){
  if (_currentUser) {
  	return $.extend({}, _currentUser);
  }
};

SessionStore.errors = function(){
  if (_errors){
    return [].slice.call(_errors);
  }
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "LOGIN":
      console.log("login emit change");
    	login(payload.user);
      this.__emitChange();
      break;
    case "LOGOUT":
      console.log("logout emit change");
    	logout();
      this.__emitChange();
      break;
    case "ERROR":
      console.log("error emit change");
      setErrors(payload.errors);
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;

var login = function(user){
	_currentUser = user;
  _errors = null;
};

 var logout = function(){
  _currentUser = null;
  _errors = null;
};

var setErrors = function(errors){
  _errors = errors;
};
