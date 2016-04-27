var React = require('react');
var SessionStore = require('./../stores/session_store'),
    UserActions = require('./../actions/user_actions');

var CurrentUserState = {
  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      userErrors: SessionStore.errors()
    };
  },

  componentDidMount: function(){
    SessionStore.addListener(this.updateUser);
    if(UserStore.currentUser() === undefined)
      UserActions.fetchCurrentUser();
  },

  updateUser: function(){
    this.setState({
      currentUser: SessionStore.currentUser(),
      userErrors: SessionStore.errors()
    })
  }
};

module.exports = CurrentUserState;
