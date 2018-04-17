import React, { Component } from 'react';
import { TextField, Button } from 'material-ui';
import { Redirect } from 'react-router-dom';

export default class PasswordRequest extends Component {
	constructor(props) {
    super(props);
    this.state = {
      responseError: false,
      codeError: false,
      passwordError: false,
      codeValue: "",
      passwordValue: "",
      codeIsFull: false,
      passwordIsFull: false,
      isLoaded: false,
      isDisabled: () => { 
        if (this.state.codeIsFull === false) {
          return true
        } else if (this.state.passwordIsFull === false) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleCodeError = this.handleCodeError.bind(this);
    this.handlePasswordError = this.handlePasswordError.bind(this);
  };

  submitForm = () => {
    let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `code=${this.state.codeValue}&password=${this.state.passwordValue}`
        };

    fetch(`${process.env.REACT_APP_OAUTH_URL}/password/reset`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ isLoaded: true });
        } else {
          this.setState({ responseError: true });
        }
      });
  };
  
  changeCode = (e) => {
    this.setState({ codeValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ codeIsFull: true })
      this.setState({ codeError: false })
    } else {
      this.setState({ codeIsFull: false })
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

  handleCodeError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ codeError: true }) }
  };

  handlePasswordError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ passwordError: true }) }
  };
	
	render() {
  	return (
    	<form className="form">
        <TextField 
          label="Verification code" 
          margin="normal" 
          onChange={this.changeCode} 
          onBlur={this.handleCodeError}
          error={this.state.codeError}
          fullWidth 
        />
        <TextField 
          label="New password" 
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
					style={{ padding:"10px 30px", marginTop:"15px" }}
          onClick={this.submitForm}
          disabled={this.state.isDisabled()}
				>
					submit
				</Button>
				{ this.state.isLoaded ? <Redirect to="/signin" push/> : null }
			</form>
    )
  }
};