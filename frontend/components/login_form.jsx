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
    // this.setState({modal: false});
  },

  guestLogin: function(e){
    e.preventDefault();
    UserActions.login({
      username: "guest",
      password: "guest"
    });
    // this.setState({modal: false});
  },

  signup: function(e){
    e.preventDefault();
    UserActions.signup({
      username: this.state.username,
      password: this.state.password
    });
    // this.setState({modal: false});
  },

  toggleSignup: function(e){
    e.preventDefault();
    this.setState({signup: !this.state.signup});
  },

  render: function(){
    var modalStyle = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(255, 255, 255, 0.75)',
        zIndex          : 10
      },
      content : {
        position        : 'fixed',
        margin          : '0 auto',
        top             : '100px',
        bottom          : '100px',
        border          : '1px solid #ccc',
        padding         : '20px',
        zIndex          : 11,
        height          : "500px",
        width           : "500px",
        // minHeight       : "400px",
        // minWidth        : "350px",
        display         : "flex",
        alignItems      : "center",
        justifyContent  : "center"
      }
    };


    var content;
    var usernameInput = (
      <input
        type="text"
        valueLink={this.linkState('username')}
        placeholder="Username"
        className={this.props.userErrors ? "error" : ""}/>
    );
    var passwordInput = (
      <input
        type="password"
        valueLink={this.linkState('password')}
        placeholder="Password"
        className={this.props.userErrors ? "error" : ""}/>
  );
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
            onRequestClose={this.closeModal}
            style={modalStyle}>

              <div className="signup">
                <h1>Sign Up</h1>
                <form onSubmit={this.signup}>
                  {usernameInput}
                  {passwordInput}
                  {this.props.userErrors ? <h4 className="error">{this.props.userErrors}</h4> : ""}
                  <input type="submit" value="Sign Up" />
                </form>
                <h4>Actually, I have an account.&nbsp;
                  <a onClick={this.toggleSignup}>Log in</a>.
                </h4>
                <button className="guest-login" onClick={this.guestLogin}>Log in as Guest</button>
              </div>
          </Modal>
        </div>
      );
    } else {
      content = (
        <div>
          <button onClick={this.openModal}>Log In</button>
            <Modal
              isOpen={this.state.modal}
              onRequestClose={this.closeModal}
              style={modalStyle}>

              <div className="login">
                <h1>Log In</h1>
                <form onSubmit={this.login}>
                  {usernameInput}
                  {passwordInput}
                  {this.props.userErrors ? <h4 className="error">{this.props.userErrors}</h4> : ""}
                  <input type="submit" value="Let's Go!" />
                </form>
                <h4>Actually, I don't have an account.&nbsp;
                  <a onClick={this.toggleSignup}>Sign up</a>.
                </h4>
                <button className="guest-login" onClick={this.guestLogin}>Log in as Guest</button>
              </div>
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
