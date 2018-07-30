import React, { Component } from 'react';
import { TextField, Button } from 'material-ui';
import { Redirect } from 'react-router-dom';

const currentLocation = window.location;
let codeValue = "";

  if ( currentLocation.pathname.length > 16 ) {
    codeValue = currentLocation.pathname.slice(16);
  }

export default class PasswordRequest extends Component {
	constructor(props) {
    super(props);
    this.state = {
      lng: this.props.language,
      responseError: false,
      errorText: "",
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
    this.pressEnter = this.pressEnter.bind(this);
  };

  submitForm = () => {
    let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `code=${this.state.codeValue.replace(/\s/g, '')}&password=${encodeURIComponent(this.state.passwordValue)}`
        };

    fetch(`${process.env.REACT_APP_OAUTH_URL}/password/reset`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ isLoaded: true });
        } else {
          this.setState({ responseError: true });
          this.setState({ errorText: this.state.lng.verifyError });
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

  pressEnter = (e) => {
    if ( e.keyCode === 13 && this.state.codeIsFull === true && this.state.passwordIsFull === true ) {
      this.submitForm();
    }
  };
	
	render() {
  	return (
    	<div className="form">
        <TextField 
          label={this.state.lng.verifyInput}
          margin="normal"
          defaultValue={codeValue}
          onChange={this.changeCode} 
          onBlur={this.handleCodeError}
          onFocus={this.changeCode}
          onKeyDown={this.pressEnter}
          error={this.state.codeError}
          autoFocus={ codeValue.length > 0 ? true : false }
          fullWidth 
        />
        <TextField 
          label={this.state.lng.newPasswordInput} 
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
					style={{ padding:"10px 30px", marginTop:"15px" }}
          onClick={this.submitForm}
          disabled={this.state.isDisabled()}
				>
					{this.state.lng.submitButton}
				</Button>
				{ this.state.isLoaded ? <Redirect to="/password/success" push/> : null }
			</div>
    )
  }
};