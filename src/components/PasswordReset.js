import React, { Component } from 'react';
import { TextField, Button } from 'material-ui';
import { Redirect } from 'react-router-dom';

export default class PasswordRequest extends Component {
	constructor(props) {
    super(props);
    this.state = {
      text: "",
      isLoaded: false,
      codeValue: "",
      passwordValue: "",
      code: false,
      password: false,
      isDisabled: () => { 
        if (this.state.code === false) {
          return true
        } else if (this.state.password === false) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.changePassword = this.changePassword.bind(this);
  };

  submitForm() {
    let xhr = new XMLHttpRequest(),
        body = `code=${this.state.codeValue}&password=${this.state.passwordValue}`;
    xhr.open('POST', `${process.env.REACT_APP_OAUTH_URL}/password/reset`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onload = () => { 
      if ( xhr.status >= 200 && xhr.status < 300 ) {
        this.setState({ isLoaded: true });
      } else {
        this.setState({ text: "Something went wrong :(" });
      }
    };
  };
  
  changeCode = (e) => {
    this.setState({ codeValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ code: true })
    } else {
      this.setState({ code: false })
    }
  };

  changePassword = (e) => {
    this.setState({ passwordValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ password: true })
    } else {
      this.setState({ password: false })
    }
  };
	
	render() {
  	return (
    	<form className="form">
				<TextField label="Verification code" margin="normal" onChange={this.changeCode} fullWidth />
				<TextField label="New password" margin="normal" type="password" onChange={this.changePassword} fullWidth />
				<span style={{ color: "red" }}>{this.state.text}</span>
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