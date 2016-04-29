var Dispatcher = require('./../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var PriceConstants = require('./../constants/price_constants');

var StockPriceStore = new Store(Dispatcher);

var _currentPrices, _priceResults, _priceErrors;

StockPriceStore.price = function(ticker_symbol){
  return _currentPrices[ticker_symbol];
};

StockPriceStore.searchErrors = function(){
  if (_priceErrors)
    return [].slice.call(_priceErrors);
  else return null;
};

StockPriceStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PriceConstants.RECEIVE_CURRENT_PRICE:
      console.log("stockpricestore receivecurrentprice");
    	replaceCurrentPrice(payload.results);
      this.__emitChange();
      break;
    case PriceConstants.ERROR:
      setErrors(payload.errors);
      this.__emitChange();
      break;
  }
};

module.exports = StockPriceStore;

var replaceCurrentPrice = function(newPrice){
  _currentPrices[newPrice.symbol] = newPrice.price;
  _priceErrors = null;
};

var setErrors = function(errors){
  _priceErrors = errors;
};
