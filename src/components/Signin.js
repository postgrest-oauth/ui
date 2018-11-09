import React, { Component } from 'react';
import { TextField, Button, CircularProgress } from 'material-ui';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.language,
      isLoading: false,
      responseError: false,
      errorText: "",
      usernameError: false,
      passwordError: false,
      usernameValue: "",
      passwordValue: "",
      usernameIsFull: false,
      passwordIsFull: false,
      isDisabled: () => { 
        if (this.state.usernameIsFull === false) {
          return true
        } else if (this.state.passwordIsFull === false) {
          return true
        } else if (this.state.isLoading === true) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleUsernameError = this.handleUsernameError.bind(this);
    this.handlePasswordError = this.handlePasswordError.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
  };

  submitForm = () => {
    this.setState({ isLoading: true });
    let responseType, clientId, state, redirectUri;
    let options = {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `username=${encodeURIComponent(this.state.usernameValue.replace(/\s/g, ''))}&password=${encodeURIComponent(this.state.passwordValue)}`
        };

    responseType=`response_type=${this.props.responseType}`;
    clientId=`&client_id=${this.props.clientId}`;
    state=`&state=${this.props.state}`;
    redirectUri=`&redirect_uri=${this.props.redirectUri}`;

    fetch(`${process.env.REACT_APP_OAUTH_URL}/signin`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?${responseType}${clientId}${state}${redirectUri}`);
        } else {
          this.setState({ isLoading: false });
          this.setState({ responseError: true });
          this.setState({ errorText: this.state.lng.signInError });
        }
      });
  };

  changeUsername = (e) => {
    this.setState({ usernameValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ usernameIsFull: true })
      this.setState({ usernameError: false })
    } else {
      this.setState({ usernameIsFull: false })
    }
  };

  changePassword = (e) => {
    this.setState({ passwordValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ passwordIsFull: true })
      this.setState({ passwordError: false })
    } else {
      this.setState({ passwordIsFull: false })
    }
  };

  handleUsernameError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ usernameError: true }) }
  };

  handlePasswordError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ passwordError: true }) }
  };

  pressEnter = (e) => {
    if ( e.keyCode === 13 && this.state.usernameIsFull === true && this.state.passwordIsFull === true ) {
      this.submitForm();
    }
  };

  render() {
    return (
      <div className="form">
        <TextField 
          label={this.state.lng.usernameInput} 
          margin="normal" 
          onChange={this.changeUsername} 
          onBlur={this.handleUsernameError} 
          onKeyDown={this.pressEnter}
          error={this.state.usernameError} 
          fullWidth 
        />
        <TextField 
          label={this.state.lng.passwordInput}
          margin="normal" 
          type="password" 
          onChange={this.changePassword} 
          onBlur={this.handlePasswordError}
          onKeyDown={this.pressEnter}
          error={this.state.passwordError}
          helperText={this.state.errorText}
          FormHelperTextProps={{ error: this.state.responseError }}
          fullWidth 
        />
        <Button 
          variant="raised" 
          color="primary" 
          style={{ padding:"10px 30px", margin:"15px 0 10px 0" }}
          onClick={this.submitForm}
          disabled={this.state.isDisabled()}
        >
          {this.state.lng.submitButton}
          {this.state.isLoading && <CircularProgress className="spinner" color="primary"/> }
        </Button>
        <Button
          variant="raised" 
          color="primary"
          style={{ marginBottom:"10px" }}
          href={`https://www.facebook.com/v3.1/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_ID}&redirect_uri=${window.location.origin}/callback/facebook&scope=email&auth_type=rerequest&state=${this.props.stateSignin}`}
        >
          <FontAwesomeIcon icon={['fab','facebook-square']} size='2x' style={{marginRight:'10px'}}/>
          {this.state.lng.loginFacebook}
        </Button>
        <Link to="/password/request" className="forget-password-link">{this.state.lng.passwordResetLink}</Link>
        <Link to="/re-verify" className="forget-password-link">{this.state.lng.reVerifyLink}</Link>
      </div>
    )
  }
};
