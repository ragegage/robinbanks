var Dispatcher = require('./../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
// var PriceConstants = require('./../constants/price_constants');

var HistoricalPriceStore = new Store(Dispatcher);

var _historicalPrices, _historicalPriceErrors;

HistoricalPriceStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  }
};

module.exports = HistoricalPriceStore;
