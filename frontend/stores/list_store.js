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

ListStore.currentPriceByTicker = function(ticker){
  var currentPrice;
  if(_list)
    for (var i = 0; i < _list.length; i++)
      if(_list[i].ticker_symbol === ticker)
        currentPrice = _list[i].price;

  return currentPrice;
};

ListStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ListConstants.RECEIVE_NEW_LIST:
    	replaceList(payload.list);
      console.log("liststore.newlist emitchange");
      this.__emitChange();
      break;
    case ListConstants.RECEIVE_NEW_LIST_ITEM:
      console.log("liststore.newlistitem emitchange");
    	addToList(payload.item);
      this.__emitChange();
      break;
    case ListConstants.ERROR:
      console.log("liststore.error emitchange");
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
  _listErrors = errors.responseJSON;
  _list = null;
};
