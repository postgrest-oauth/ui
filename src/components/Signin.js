import React, { Component } from 'react';
import { TextField, Button } from 'material-ui';
import { Link } from 'react-router-dom';

const queryString = require('query-string');
const parsed = queryString.parse(window.location.search);

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: false,
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
    let options = {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `username=${this.state.usernameValue}&password=${this.state.passwordValue}`
        };

    fetch(`${process.env.REACT_APP_OAUTH_URL}/signin`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?response_type=${parsed.response_type}&client_id=${parsed.client_id}`)
        } else {
          this.setState({ responseError: true });
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
          label="Username" 
          margin="normal" 
          onChange={this.changeUsername} 
          onBlur={this.handleUsernameError} 
          error={this.state.usernameError} 
          fullWidth 
        />
        <TextField 
          label="Password" 
          margin="normal" 
          type="password" 
          onChange={this.changePassword} 
          onBlur={this.handlePasswordError} 
          error={this.state.passwordError} 
          fullWidth 
        />
        { this.state.responseError ? <span style={{ color: "red" }}>Something went wrong :(</span> : null }
        <Button 
          variant="raised" 
          color="primary" 
          style={{ padding:"10px 30px", margin:"15px 0 10px 0" }}
          onClick={this.submitForm}
          disabled={this.state.isDisabled()}
        >
          submit
        </Button>
        <Link to="/password/request" className="forget-password-link"> Forgot your password? </Link>
      </div>
    )
  }
};
