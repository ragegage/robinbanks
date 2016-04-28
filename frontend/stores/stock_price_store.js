var Dispatcher = require('./../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var PriceConstants = require('./../constants/price_constants');

var StockPriceStore = new Store(Dispatcher);

var _priceResults, _priceErrors;

StockPriceStore.list = function(){
  if (_priceResults)
    return [].slice.call(_priceResults);
  else return null;
};

StockPriceStore.searchErrors = function(){
  if (_priceErrors)
    return [].slice.call(_priceErrors);
  else return null;
};

StockPriceStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PriceConstants.RECEIVE_PRICE_RESULTS:
    	replaceResults(payload.results);
      this.__emitChange();
      break;
    case PriceConstants.ERROR:
      setErrors(payload.errors);
      this.__emitChange();
      break;
  }
};

module.exports = StockPriceStore;

var replaceResults = function(newResults){
  _priceResults = newResults;
  _priceErrors = null;
};

var setErrors = function(errors){
  _priceErrors = errors;
};
