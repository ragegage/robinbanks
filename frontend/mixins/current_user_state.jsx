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
    console.log("current_user_state didmount");
    this.userListener = SessionStore.addListener(this.updateUser);
    if(SessionStore.currentUser() === undefined)
      UserActions.fetchCurrentUser();
  },

  updateUser: function(){
    console.log("current_user_state updateuser called");
    var currentUser = SessionStore.currentUser();
    var userErrors = SessionStore.errors();
    this.setState({
      currentUser: currentUser,
      userErrors: userErrors
    });
    console.log(userErrors);
    console.log(currentUser);
    if(currentUser)
      if(this.closeModal)
        this.closeModal();
    if(currentUser && (!this.state.list || currentUser.id !== this.state.list.user_id)){
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
