var Dispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var ListConstants = require('./../constants/list_constants');

var ListStore = new Store(Dispatcher);

var _list, _listErrors;

ListStore.list = function(){
  if (_list)
    return [].slice.call(_list);
  else return null;
};

ListStore.listErrors = function(){
  if (_listErrors)
    return [].slice.call(_listErrors);
  else return null;
};

ListStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ListConstants.RECEIVE_NEW_LIST:
    	replaceList(payload.list);
      this.__emitChange();
      break;
    case ListConstants.RECEIVE_NEW_LIST_ITEM:
    	addToList(payload.item);
      this.__emitChange();
      break;
    case ListConstants.ERROR:
      setErrors(payload.errors);
      this.__emitChange();
      break;
  }
};

module.exports = ListStore;

var replaceList = function(newList){
  _list = newList;
  _listErrors = null;
};

var addToList = function(newListItem){
  _list.push(newListItem);
  _listErrors = null;
};

var setErrors = function(errors){
  _listErrors = errors;
};
