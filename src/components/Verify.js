import React, { Component } from 'react';
import { TextField, Button, Typography } from 'material-ui';
import { Redirect } from 'react-router-dom';

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isLoaded: false,
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

  submitForm = () => {
    let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `code=${this.state.codeValue}`
        };

    fetch(`${process.env.REACT_APP_OAUTH_URL}/verify`, options)
      .then((response)=> {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ isLoaded: true });
        } else {
          this.setState({ text: "Something went wrong :(" });
        }
      });
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
        <span>{this.state.text}</span>
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