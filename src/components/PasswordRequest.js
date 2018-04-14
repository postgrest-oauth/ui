import React, { Component } from 'react';
import { TextField, Button } from 'material-ui';
import { Redirect } from 'react-router-dom';

export default class PasswordRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isLoaded: false,
      inputValue: "",
      input: false,
      isDisabled: () => { 
        if (this.state.input === false) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeInput = this.changeInput.bind(this);
  };

  submitForm() {
    let xhr = new XMLHttpRequest(),
        body = `username=${this.state.inputValue}`;
    xhr.open('POST', `${process.env.REACT_APP_OAUTH_URL}/password/request`, true);
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

  changeInput = (e) => {
    this.setState({ inputValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ input: true })
    } else {
      this.setState({ input: false })
    }
  };
  
	render() {
  	return (
    	<form className="form">
				<TextField label="Email or phone" margin="normal" onChange={this.changeInput} fullWidth />
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
        { this.state.isLoaded ? <Redirect to="/password/reset" push/> : null }
			</form>
    )
  }
};