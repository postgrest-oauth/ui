import React, { Component } from 'react';
import { TextField, Button, FormControl, Input, InputLabel, FormHelperText } from 'material-ui';
import MaskedInput from 'react-text-mask';
import { Redirect } from 'react-router-dom';

const json = require('../language.json'),
      lng = json.language;

function InputMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      mask={['+',/\d/,/\d/,/\d/,' ','(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/]}
      placeholder="+123 (45) 678-90-12"
      ref={inputRef}
      guide={false}
      style={{ border:"none", width:"100%", outline:"none", fontFamily:"Roboto", fontSize:"16px", padding:"5px 0" }}
    />
  )
}

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: false,
      errorText: "",
      emailError: false,
      passwordError: false,
      phoneError: false,
      emailValue: "",
      passwordValue: "",
      phoneValue: "",
      emailIsFull: false,
      passwordIsFull: false,
      phoneIsFull: false,
      isLoaded: false,
      isDisabled: () => { 
        if (this.state.emailIsFull === false) {
          return true
        } else if (this.state.passwordIsFull === false) {
          return true
        } else if (this.state.phoneIsFull === false) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.handleEmailError = this.handleEmailError.bind(this);
    this.handlePasswordError = this.handlePasswordError.bind(this);
    this.handlePhoneError = this.handlePhoneError.bind(this);
  };

  submitForm = () => {
    let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `email=${this.state.emailValue}&password=${this.state.passwordValue}&phone=${this.state.phoneValue}`
        };

    fetch(`${process.env.REACT_APP_OAUTH_URL}/signup`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ isLoaded: true });
        } else {
          this.setState({ responseError: true });
          this.setState({ errorText: lng.signUpError });
        }
      });
  };

  changeEmail = (e) => {
    this.setState({ emailValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ emailIsFull: true })
      this.setState({ emailError: false })
    } else {
      this.setState({ emailIsFull: false })
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

  changePhone = (e) => {
    this.setState({ phoneValue: e.target.value });
    if ( e.target.value.length > 18 ) {
      this.setState({ phoneIsFull: true })
      this.setState({ phoneError: false })
    } else {
      this.setState({ phoneIsFull: false })
    }
  };

  handleEmailError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ emailError: true }) }
  };

  handlePasswordError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ passwordError: true }) }
  };

  handlePhoneError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ phoneError: true }) }
  };

  render() {
    return (
      <div className="form">
        <TextField 
          label={lng.emailAddress} 
          margin="normal" 
          onChange={this.changeEmail}
          onBlur={this.handleEmailError}
          error={this.state.emailError}
          fullWidth 
        />
        <TextField
          label={lng.passwordInput} 
          margin="normal" 
          type="password" 
          onChange={this.changePassword}
          onBlur={this.handlePasswordError}
          error={this.state.passwordError}
          fullWidth 
        />
        <FormControl margin="normal" error={this.state.phoneError} fullWidth >
          <InputLabel shrink={true}> {lng.phoneNumber} </InputLabel>
          <Input onChange={this.changePhone} onBlur={this.handlePhoneError} inputComponent={InputMask} />
          { this.state.responseError ? <FormHelperText error>{this.state.errorText}</FormHelperText> : null }
        </FormControl>
        <Button 
          variant="raised"
          color="primary" 
          style={{ padding:"10px 30px", marginTop:"15px" }}
          onClick={this.submitForm}
          disabled={this.state.isDisabled()}
        >
          {lng.submitButton}
        </Button>
        { this.state.isLoaded ? <Redirect to="/verify" push/> : null } 
      </div>
    )
  }
};
