import React, { Component } from 'react';
import { TextField, Button } from 'material-ui';
import { Link } from 'react-router-dom';

const queryString = require('query-string'),
      parsed = queryString.parse(window.location.search),
      json = require('../language.json'),
      lng = json.language;

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  };

  submitForm = () => {
    let responseType, clientId, state, redirectUri;
    let options = {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `username=${this.state.usernameValue}&password=${this.state.passwordValue}`
        };

    parsed.response_type ? responseType=`response_type=${parsed.response_type}` : responseType="";
    parsed.client_id ? clientId=`&client_id=${parsed.client_id}` : clientId="";
    parsed.state ? state=`&state=${parsed.state}` : state="";
    parsed.redirect_uri ? redirectUri=`&redirect_uri=${parsed.redirect_uri}` : redirectUri="";

    fetch(`${process.env.REACT_APP_OAUTH_URL}/signin`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?${responseType}${clientId}${state}${redirectUri}`);
        } else {
          this.setState({ responseError: true });
          this.setState({ errorText: lng.errorMessage });
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

  render() {
    
    return (
      <div className="form">
        <TextField 
          label={lng.usernameInput} 
          margin="normal" 
          onChange={this.changeUsername} 
          onBlur={this.handleUsernameError} 
          error={this.state.usernameError} 
          fullWidth 
        />
        <TextField 
          label={lng.passwordInput}
          margin="normal" 
          type="password" 
          onChange={this.changePassword} 
          onBlur={this.handlePasswordError} 
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
          {lng.submitButton}
        </Button>
        <Link to="/password/request" className="forget-password-link">{lng.passwordResetLink}</Link>
      </div>
    )
  }
};
