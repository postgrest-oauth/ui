import React, { Component } from 'react';
import { TextField, Button, Typography } from 'material-ui';
import { Redirect } from 'react-router-dom';

const currentLocation = window.location;
let codeValue = "";

  if ( currentLocation.pathname.length > 8 ) {
    codeValue = currentLocation.pathname.slice(8);
  }

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.language,
      responseError: false,
      errorText: "",
      codeError: false,
      codeValue: "",
      codeIsFull: false,
      isLoaded: false,
      isDisabled: () => { 
        if (this.state.codeIsFull === false) {
          return true
        } else {
          return false
        }
      }
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.handleCodeError = this.handleCodeError.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
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

  handleCodeError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ codeError: true }) }
  }

  pressEnter = (e) => {
    if ( e.keyCode === 13 && this.state.codeIsFull === true ) {
      this.submitForm();
    }
  };

  render() {
    return(
      <div className="form">
        <Typography color='primary'>{this.state.lng.verifyMessage}</Typography>
        <TextField
          label={this.state.lng.verifyInput}
          margin="normal" 
          onChange={this.changeCode}
          onFocus={this.changeCode}
          onBlur={this.handleCodeError}
          onKeyUp={this.pressEnter}
          onKeyDown={this.props.disableSpace}
          error={this.state.codeError}
          helperText={this.state.errorText}
          FormHelperTextProps={{ error: this.state.responseError }}
          defaultValue={codeValue}
          autoFocus={ codeValue.length > 0 ? true : false }
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
        { this.state.isLoaded ? <Redirect to="/signin" push/> : null }
      </div>
    )
  }
};