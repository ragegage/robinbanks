var Dispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var SessionStore = new Store(AppDispatcher);

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
    	login(payload.user);
      this.__emitChange();
      break;
    case "LOGOUT":
    	logout();
      this.__emitChange();
      break;
    case "ERROR":
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
