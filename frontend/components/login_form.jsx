var React = require('react'),
    HashHistory = require('react-router').hashHistory,
    Modal = require('react-modal'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require('./../actions/user_actions'),
    CurrentUserState = require('./../mixins/current_user_state');

var LoginForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      modal: false,
      username: "",
      password: "",
      signup: false
    };
  },

  componentDidMount: function(){
  },

  logout: function(e){
    e.preventDefault();
    UserActions.logout();
    HashHistory.push("/");
  },

  login: function(e){
    e.preventDefault();
    UserActions.login({
      username: this.state.username,
      password: this.state.password
    });
    this.setState({modal: false});
  },

  guestLogin: function(e){
    e.preventDefault();
    UserActions.login({
      username: "guest",
      password: "guest"
    });
    this.setState({modal: false});
  },

  signup: function(e){
    e.preventDefault();
    UserActions.signup({
      username: this.state.username,
      password: this.state.password
    });
    this.setState({modal: false});
  },

  toggleSignup: function(e){
    e.preventDefault();
    this.setState({signup: !this.state.signup});
  },

  render: function(){
    var content;
    if(this.props.currentUser){
      content = (
        <button onClick={this.logout}>Log Out, {this.props.currentUser.username}</button>
      );
    } else if(this.state.signup) {
      content = (
        <div>
          <button onClick={this.openModal}>Sign Up</button>
          <Modal
            isOpen={this.state.modal}
            onRequestClose={this.closeModal}>

            {this.props.userErrors ? this.props.userErrors : ""}
              <h1>Sign Up</h1>
              <form onSubmit={this.signup}>
                <label>Username
                  <input type="text" valueLink={this.linkState('username')} />
                </label>
                <label>Password
                  <input type="password" valueLink={this.linkState('password')} />
                </label>
                <input type="submit" value="Sign Up" />
              </form>
              <p>Actually, I have an account.
                <a onClick={this.toggleSignup}>Log in</a>.
              </p>
          </Modal>
        </div>
      );
    } else {
      content = (
        <div>
          <button onClick={this.openModal}>Log In</button>
            <Modal
              isOpen={this.state.modal}
              onRequestClose={this.closeModal}>

              {this.props.userErrors ? this.props.userErrors : ""}
              <h1>Log In</h1>
              <form onSubmit={this.login}>
                <label>Username
                  <input type="text" valueLink={this.linkState('username')} />
                </label>
                <label>Password
                  <input type="password" valueLink={this.linkState('password')} />
                </label>
                <input type="submit" value="Let's Go!" />
              </form>
              <p>Actually, I don't have an account.
                <a onClick={this.toggleSignup}>Sign up</a>.
              </p>
              <button className="guest-login" onClick={this.guestLogin}>Log in as Guest</button>
          </Modal>
        </div>
      );
    }

    return (
      <div className="login-form">
        {content}
      </div>
    );
  },

  closeModal: function(){
    this.setState({modal: false});
  },

  openModal: function(){
    this.setState({modal: true});
  }
});

module.exports = LoginForm;
