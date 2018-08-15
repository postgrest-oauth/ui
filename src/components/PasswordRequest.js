import React, { Component } from 'react';
import { TextField, Button, CircularProgress } from 'material-ui';
import { Redirect } from 'react-router-dom';

const currentLocation = window.location;
let usernameValue = "";

if ( currentLocation.pathname.length > 18 ) {
  usernameValue = currentLocation.pathname.slice(18);
}

export default class PasswordRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.language,
      isLoading: false,
      responseError: false,
      errorText: "",
      inputError: false,
      inputValue: "",
      inputIsFull: false,
      isLoaded: false,
      isDisabled: () => { 
        if (this.state.inputIsFull === false) {
          return true
        } else if (this.state.isLoading === true) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.handleInputError = this.handleInputError.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
  };

  componentDidMount() {
    if (usernameValue.length > 0) {
      this.submitForm();
    }
  };

  submitForm = () => {
    this.setState({ isLoading: true });
    let requestBody = '';
    if (usernameValue.length > 0) {
      requestBody = `username=${usernameValue}`
    } else {
      requestBody = `username=${encodeURIComponent(this.state.inputValue.replace(/\s/g, ''))}`
    }
    let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        };

    fetch(`${process.env.REACT_APP_OAUTH_URL}/password/request`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ isLoaded: true });
        } else {
          this.setState({ isLoading: false });
          this.setState({ responseError: true });
          this.setState({ errorText: this.state.lng.requestError });
        }
      });
  };

  changeInput = (e) => {
    this.setState({ inputValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ inputIsFull: true })
      this.setState({ inputError: false })
    } else {
      this.setState({ inputIsFull: false })
    }
  };

  handleInputError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ inputError: true }) }
  };

  pressEnter = (e) => {
    if ( e.keyCode === 13 && this.state.inputIsFull === true ) {
      this.submitForm();
    }
  };
  
	render() {
  	return (
    	<div className="form">
        <TextField 
          label={this.state.lng.passwordRequestInput} 
          margin="normal" 
          onChange={this.changeInput} 
          onBlur={this.handleInputError}
          onKeyDown={this.pressEnter}
          error={this.state.inputError}
          helperText={this.state.errorText}
          FormHelperTextProps={{ error: this.state.responseError }}
          defaultValue={usernameValue}
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
          {this.state.isLoading && <CircularProgress className="spinner" color="primary"/> }
				</Button>
        { this.state.isLoaded ? <Redirect to="/password/reset" push/> : null }
			</div>
    )
  }
};