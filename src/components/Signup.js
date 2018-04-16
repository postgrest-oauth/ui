import React, { Component } from 'react';
import { TextField, Button, FormControl, Input, InputLabel } from 'material-ui';
import MaskedInput from 'react-text-mask';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';

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
      text: "",
      isLoaded: false,
      emailValue: "",
      passwordValue: "",
      phoneValue: "",
      email: false,
      password: false,
      phone: false,
      isDisabled: () => { 
        if (this.state.email === false) {
          return true
        } else if (this.state.password === false) {
          return true
        } else if (this.state.phone === false) {
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
          this.setState({ text: "Something went wrong :(" });
        }
      });
  };

  changeEmail = (e) => {
    this.setState({ emailValue: e.target.value });
    if ( e.target.value.length > 0 ) {
      this.setState({ email: true })
    } else {
      this.setState({ email: false })
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

  changePhone = (e) => {
    this.setState({ phoneValue: e.target.value });
    if ( e.target.value.length > 18 ) {
      this.setState({ phone: true })
    } else {
      this.setState({ phone: false })
    }
  };

  render() {
    return (
      <form className="form">
        <TextField label="Email address" margin="normal" onChange={this.changeEmail} fullWidth />
        <TextField label="Password" margin="normal" type="password" onChange={this.changePassword} fullWidth />
        <FormControl margin="normal" fullWidth >
          <InputLabel shrink={true}> Phone number </InputLabel>
          <Input onChange={this.changePhone} inputComponent={InputMask} />
        </FormControl>
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
        { this.state.isLoaded ? <Redirect to="/verify" push/> : null } 
      </form>
    )
  }
};
