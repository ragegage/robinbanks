var ApiUtil = require('./../util/api_util');

var ClientActions = {
  fetchCurrentList: function(){
    ApiUtil.fetchList();
  },

  createListItem: function(stock_id){
    ApiUtil.createListItem(stock_id);
  },

  updateListItem: function(id, newSiblingId){
    ApiUtil.updateListItem(id, newSiblingId);
  },

  removeListItem: function(id){
    ApiUtil.removeListItem(id);
  }
};

module.exports = ClientActions;
