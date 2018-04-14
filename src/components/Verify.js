import React, { Component } from 'react';
import { TextField, Button, Typography } from 'material-ui';

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textColor: "",
      codeValue: "",
      code: false,
      isDisabled: () => { 
        if (this.state.code === false) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeCode = this.changeCode.bind(this);
  };

  submitForm() {
    let xhr = new XMLHttpRequest(),
        body = `code=${this.state.codeValue}`;
    xhr.open('POST', `${process.env.REACT_APP_OAUTH_URL}/verify`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onload = () => { 
      if ( xhr.status >= 200 && xhr.status < 300 ) {
        this.setState({ text: "Success! :)", textColor: "green" });
      } else {
        this.setState({ text: "Something went wrong :(", textColor: "red" });
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

  render() {
    return(
      <form className="form">
        <Typography>Please input verification code from email</Typography>
        <TextField label="Verification code" margin="normal" onChange={this.changeCode} fullWidth />
        <span style={{ color: this.state.textColor }}>{this.state.text}</span>
        <Button 
          variant="raised" 
          color="primary" 
          style={{ padding:"10px 30px", marginTop:"15px" }}
          onClick={this.submitForm}
          disabled={this.state.isDisabled()}
        >
          submit
        </Button>
      </form>
    )
  }
};