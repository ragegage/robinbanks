var React = require('react');
var SessionStore = require('./../stores/session_store'),
    ListStore = require('./../stores/list_store'),
    UserActions = require('./../actions/user_actions'),
    ClientActions = require('./../actions/client_actions');

var CurrentUserState = {
  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      userErrors: SessionStore.errors(),
      listErrors: ListStore.listErrors()
    };
  },

  componentDidMount: function(){
    this.userListener = SessionStore.addListener(this.updateUser);
    this.listListener = ListStore.addListener(this.updateListErrors);
    if(SessionStore.currentUser() === undefined)
      UserActions.fetchCurrentUser();
  },

  updateListErrors: function(){
    this.setState({
      listErrors: ListStore.listErrors()
    })
  },

  updateUser: function(){
    var currentUser = SessionStore.currentUser();
    var userErrors = SessionStore.errors();
    this.setState({
      currentUser: currentUser,
      userErrors: userErrors
    });
    if(currentUser)
      if(this.closeModal)
        this.closeModal();
    if(currentUser 
        && (!this.state.list || currentUser.id !== this.state.list.user_id)
        && !this.state.listErrors){
      // debugger
      ClientActions.fetchCurrentList();
    }
    // if(userErrors)
    //   this.setState({modal: true});
    // else if(currentUser && (!this.state.list || currentUser.id !== this.state.list.user_id))
    //   ClientActions.fetchCurrentList();
  }
};

module.exports = CurrentUserState;
