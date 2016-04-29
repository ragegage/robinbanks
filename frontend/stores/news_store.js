var Dispatcher = require('./../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
// var NewsConstants = require('./../constants/news_constants');

var NewsStore = new Store(Dispatcher);

var _historicalPrices, _historicalPriceErrors;

NewsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  }
};

module.exports = NewsStore;
