var React = require('react');
var SessionStore = require('./../stores/session_store'),
    UserActions = require('./../actions/user_actions'),
    ClientActions = require('./../actions/client_actions');

var CurrentUserState = {
  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      userErrors: SessionStore.errors()
    };
  },

  componentDidMount: function(){
    this.userListener = SessionStore.addListener(this.updateUser);
    if(SessionStore.currentUser() === undefined)
      UserActions.fetchCurrentUser();
  },

  updateUser: function(){
    this.setState({
      currentUser: SessionStore.currentUser(),
      userErrors: SessionStore.errors()
    });
    if(this.state.userErrors)
      this.setState({modal: true});
    else
      ClientActions.fetchCurrentList();
  }
};

module.exports = CurrentUserState;
