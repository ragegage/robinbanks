var Dispatcher = require('./../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var HistoricalPriceConstants = require('./../constants/historical_price_constants');

var HistoricalPriceStore = new Store(Dispatcher);

var _historicalPrices, _historicalPriceErrors;

HistoricalPriceStore.data = function(){
  if(_historicalPrices)
    return [].slice.call(_historicalPrices);
  else return [];
};

HistoricalPriceStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case HistoricalPriceConstants.RECEIVE_HISTORICAL_PRICE_RESULTS:
      _historicalPrices = payload.data;
      this.__emitChange();
      break;
    case HistoricalPriceConstants.ERROR:
      _historicalPriceErrors = payload.errors;
      this.__emitChange();
      break;
  }
};

module.exports = HistoricalPriceStore;
