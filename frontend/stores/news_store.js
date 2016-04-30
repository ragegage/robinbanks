var Dispatcher = require('./../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var NewsConstants = require('./../constants/news_constants');

var NewsStore = new Store(Dispatcher);

var _news, _newsErrors;

NewsStore.news = function(){
  return [].slice.call(_news);
};

NewsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case NewsConstants.RECEIVE_NEWS:
      _news = payload.news;
      _newsErrors = null;
      this.__emitChange();
      break;
    case NewsConstants.ERROR:
      _newsErrors = payload.errors;
      _news = null;
      this.__emitChange();
      break;
  }
};

module.exports = NewsStore;
