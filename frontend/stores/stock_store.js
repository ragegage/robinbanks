var Dispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SearchConstants = require('./../constants/search_constants');

var StockStore = new Store(Dispatcher);

var _searchResults, _searchErrors;

StockStore.list = function(){
  if (_searchResults)
    return [].slice.call(_searchResults);
  else return null;
};

StockStore.searchErrors = function(){
  if (_searchErrors)
    return [].slice.call(_searchErrors);
  else return null;
};

StockStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.RECEIVE_SEARCH_RESULTS:
      console.log("stockstore "+payload.results);
    	replaceResults(payload.results);
      this.__emitChange();
      break;
    case SearchConstants.ERROR:
      setErrors(payload.errors);
      this.__emitChange();
      break;
  }
};

module.exports = StockStore;

var replaceResults = function(newResults){
  _searchResults = newResults;
  _searchErrors = null;
};

var setErrors = function(errors){
  _searchErrors = errors;
};
